import { Segment, Tab, TabPane } from "semantic-ui-react";
import { Profile } from "../../App/Models/Profile";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";

interface Props {

    profile: Profile
}

function ProfileContent({ profile }: Props) {

    const panes = [
        { menuItem: 'About', render: () => <TabPane>About Content</TabPane> },
        { menuItem: 'Photo', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Event', render: () => <TabPane>Event Content</TabPane> },
        { menuItem: 'Followers', render: () => <TabPane>Follower's Content</TabPane> },
        { menuItem: 'Following', render: () => <TabPane>Following Content</TabPane> },
    ]
    return (
        <Segment>
            <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
      </Segment>
      
  );
}

export default observer(ProfileContent);