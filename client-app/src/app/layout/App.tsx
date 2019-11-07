import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from './LoadingComponent';
import ActivityStore from './../stores/activityStore';
import { observer } from 'mobx-react-lite';
import HomePage from './../../features/home/HomePage';
import { Route } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
    //5.054 - empty array ensures that useEffect will run 1 time only - every time this component renders the useEffect method will be called
    //7.082 - in the same empty array in 5.054 - specify activity store

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App); //7.082 - need to make App an observer of activites
