import React from "react";
import { Card, Image, Icon, Button } from 'semantic-ui-react'

const ActivityDetails = () => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Title</Card.Header>
        <Card.Meta>
          <span>Title</span>
        </Card.Meta>
        <Card.Description>
          Desc
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}> {/* width of 2 to represent there are 2 buttons */}
            <Button basic color='blue' content='Edit' />
            <Button basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
