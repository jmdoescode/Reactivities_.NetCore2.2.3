import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./../details/ActivityDetails";
import ActivityForm from "./../form/ActivityForm";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode, activity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* && - everything to the right only display if it is not null*/}
        {activity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm
            key={(activity && activity.id) || 0} //5.067 - bc it will cause component to reinitialize when you click Edit & createActivity
            activity={activity!}
          />
        )}{" "}
        {/* 5.064 - add ! instead of union type null */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
