import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Activity } from '../../../App/Models/Activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../App/Store/store';


const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailsHeader({ activity }: Props) {

    const { activityStore: { loading, updateAttendance, cancelActivity } } = useStore();

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled && (
                    <Label
                        style={{ position: 'absolute', top: 20, left: -14, zIndex: 1000 }}
                        color='orange'
                        ribbon
                        content="cancelled"
                    />
                )}
                <Image src={`/Assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, "dd MMM yyyy")}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profile/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {(activity.isHost) ? (
                    <>
                        <Button
                            color={activity.isCancelled ? "green" : "red"}
                            floated='left'
                            content={activity.isCancelled ? "Re-Activate Activity" : "Cancel Activity"}
                            onClick={cancelActivity}
                            loading={loading}
                        >
                            
                        </Button>
                        <Button
                            as={Link} to={`/manage/${activity.id}`}
                            disabled={activity.isCancelled}
                            color='orange' floated='right'>
                            Manage Event
                        </Button>
                    </>
                   
                ) : (activity.isGoing) ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                            <Button loading={loading} onClick={updateAttendance}
                                disabled={activity.isCancelled}
                                color='teal'>Join Activity</Button>
                )}



            </Segment>
        </Segment.Group>
    )
})
