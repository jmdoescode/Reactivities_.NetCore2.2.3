import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import axios from 'axios'
import NavBar from './../../features/nav/NavBar';
import { IActivity } from './../models/activity';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      });
  }, []); //empty array ensures that useEffect will run 1 time only - every time this component renders the useEffect method will be called

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
}

export default App;
