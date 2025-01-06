import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";


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

    console.log("getted : " + activity);

    return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image circular size="tiny" src='/Assets/user.png'></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
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
               Attendies go here
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

export default ActivityListItem;