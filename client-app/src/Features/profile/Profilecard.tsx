import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../App/Models/Profile";
import { observer } from "mobx-react-lite";

interface Props {

    profile: Profile
}

function Profilecard({ profile }: Props) {
    return (
        <Card as={Link} to={`/profile/${profile.username}`}>
            <Image src={profile.image ||"/Assets/user.png"} />
            <Card.Content>
               
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Icon name="user" />
                20 followers
            </Card.Content>
      </Card>
  );
}

export default observer(Profilecard);