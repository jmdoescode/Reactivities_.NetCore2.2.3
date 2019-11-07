import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from 'mobx-react-lite';
import LoadingComponent from './../../../app/layout/LoadingComponent';
import ActivityStore from './../../../app/stores/activityStore';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
    //5.054 - empty array ensures that useEffect will run 1 time only - every time this component renders the useEffect method will be called
    //7.082 - in the same empty array in 5.054 - specify activity store

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2> {/* 8.100 - just replacing this for now */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
