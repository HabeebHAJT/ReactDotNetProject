import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useStore } from "../../App/Store/store";
import { useEffect } from "react";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { observer } from "mobx-react-lite";



function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { isprofileloading, loadProfile, profile } = profileStore;

    useEffect(() => {
        loadProfile(username!);
    }, [loadProfile, username])

    if (isprofileloading) return <LoadingComponent content="Loading profile..."/>

  return (
      <Grid>
          <Grid.Column width={16}>
              {profile && (
                  <>
                      <ProfileHeader profile={profile!} />
                      <ProfileContent profile={profile!} />
                  </>
              )
              }
          </Grid.Column>
      </Grid>
  );
}

export default observer(ProfilePage);