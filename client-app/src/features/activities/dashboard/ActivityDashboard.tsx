import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./../details/ActivityDetails";
import ActivityForm from "./../form/ActivityForm";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {activities, editMode, selectedActivity, selectActivity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* && - everything to the right only display if it is not null*/}
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0} //5.067 - bc it will cause component to reinitialize when you click Edit & createActivity
            activity={selectedActivity!}
          />
        )}{" "}
        {/* 5.064 - add ! instead of union type null */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
