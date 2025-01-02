import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import { useState } from "react";

interface Props {

    activities: Activity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
    submitting:boolean

}

function ActivityListItems({ activities, handleSelectedActivity, handleDeleteActivity, submitting }: Props) {

    const [target, setTarget] = useState("");

    function handlActivityDelete(e: any, id:string) {
        setTarget(e.target.name);
        handleDeleteActivity(id)
    }

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
                                <Button loading={submitting && target == activity.id}
                                        floated='right'
                                        name={activity.id}
                                        onClick={(e) => handlActivityDelete(e, activity.id)}
                                        color='red'
                                        content='Delete' />
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