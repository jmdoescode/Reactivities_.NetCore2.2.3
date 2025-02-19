using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirment
    {
        public class IsHostRequirement : IAuthorizationRequirement
        {
        }

        public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly DataContext _dataContext;
            public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
            {
                _dataContext = context;
                _httpContextAccessor = httpContextAccessor;
            }

            protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                        .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

                var activity = _dataContext.Activities.FindAsync(activityId).Result;

                var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

                if (host?.AppUser?.UserName == currentUserName)
                    context.Succeed(requirement);

                return Task.CompletedTask;
            }
        }
    }
}