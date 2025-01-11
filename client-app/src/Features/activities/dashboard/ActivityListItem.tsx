import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { observer } from "mobx-react-lite";


interface Props {

    activity:Activity
}
function ActivityListItem({ activity }: Props) {
    //const { activityStore } = useStore();
    //const { loading, deleteActivity } = activityStore;
    //const [target, setTarget] = useState("");
    //function handlActivityDelete(e: any, id: string) {
    //    setTarget(e.target.name);
    //    deleteActivity(id)
    //}

  /*  console.log("getted : " + activity);*/

    return (

        <Segment.Group>
            <Segment>
                {activity.isCancelled&&(<Label attached="top" color="red" content="Cancelled" style={{ textAlign: "center" }} />)}
                <Item.Group>
                    <Item>
                        <Item.Image circular size="tiny" src='/Assets/user.png' style={{marginBottom:4}}></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color="orange" content={`You are hosting this activity`} />
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color="green" content={`You are going to this activity`} />
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />{format(activity.date!, "dd MMM yyyy h:mm aa")} 
                    <Icon name="marker"/>{activity.venue}
                </span>
            </Segment>
            <Segment>
                <ActivityListItemAttendee attendees={activity.attendees!}></ActivityListItemAttendee>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal"
                    content="View"
                    floated="right"
                />
            </Segment>
        </Segment.Group>
        
   
     


  );
}

export default observer(ActivityListItem);