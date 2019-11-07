import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from './LoadingComponent';
import ActivityStore from './../stores/activityStore';
import { observer } from 'mobx-react-lite';
import HomePage from './../../features/home/HomePage';
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
    //5.054 - empty array ensures that useEffect will run 1 time only - every time this component renders the useEffect method will be called
    //7.082 - in the same empty array in 5.054 - specify activity store

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
          </Container>
        </Fragment>
      )}/>
    </Fragment>
  );
};

export default withRouter(observer(App)); //7.082 - need to make App an observer of activites
//8.103 - withRouter - make routing properties available
