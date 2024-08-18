import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";

interface Props {

    activities: Activity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;

}

function ActivityListItems({ activities, handleSelectedActivity, handleDeleteActivity }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.venue},{activity.city}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' onClick={() => handleSelectedActivity(activity.id)} color='blue' content='View' />
                                <Button floated='right' onClick={() => handleDeleteActivity(activity.id)} color='red' content='Delete' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                ))
                }
            </Item.Group>
        </Segment>
       
  );
}

export default ActivityListItems;