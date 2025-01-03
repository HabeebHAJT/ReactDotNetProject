import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";



function ActivityListItems() {

    const { activityStore } = useStore();
    const {loading, deleteActivity, } = activityStore;

    const [target, setTarget] = useState("");



    function handlActivityDelete(e: any, id:string) {
        setTarget(e.target.name);
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.getListByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.venue},{activity.city}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' as={Link} to={`/activities/${activity.id}`} color='blue' content='View' />
                                <Button loading={loading && target == activity.id}
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

export default observer(ActivityListItems);