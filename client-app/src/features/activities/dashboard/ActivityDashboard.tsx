import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./../details/ActivityDetails";
import ActivityForm from "./../form/ActivityForm";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {activities, editMode, selectedActivity, selectActivity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        ></ActivityList>
      </Grid.Column>
      test test
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
