import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import NavBar from "./../../features/nav/NavBar";
import { IActivity } from "./../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []); //empty array ensures that useEffect will run 1 time only - every time this component renders the useEffect method will be called

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          //selectedActivity={selectedActivity!} //use exclamation mark defines it as an activity or null (overrides the type safety)
          selectedActivity={selectedActivity!} //better to define union type as null in ActivityDashboard
        />
      </Container>
    </Fragment>
  );
};

export default App;
