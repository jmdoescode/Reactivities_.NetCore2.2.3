using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Persistence;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic
                var activity = await _context.Activities.FindAsync(request.Id);

                if(activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity="Could not find activity"});

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x =>
                    x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new {Attendance = "Already attending this activity"});

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}