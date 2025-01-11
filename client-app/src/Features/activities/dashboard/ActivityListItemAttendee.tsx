import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";
import { Link } from "react-router-dom";
import Profilecard from "../../profile/Profilecard";

interface Props {
    attendees?: Profile[]
}

function ActivityListItemAttendee({ attendees }: Props) {



    return (

        <List horizontal>
           
            {attendees?.map(attendee => (
                <Popup
                hoverable
                key={attendee.username}
                trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profile/${attendee.username}`} >
                        <Image circular size="mini" src={attendee.image || "/Assets/user.png"} alt={attendee.displayName} />
                    </List.Item>
                }
                >
                    <Popup.Content>
                        <Profilecard profile={attendee} />
                    </Popup.Content>
            </Popup>
               

            ))}

        </List>
    );
}

export default observer(ActivityListItemAttendee);