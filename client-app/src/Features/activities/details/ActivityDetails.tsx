import {  Grid } from "semantic-ui-react";
import { useStore } from "../../../App/Store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";






function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (activity == undefined) return ""

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChats />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityDetailsSideBar/>
            </Grid.Column>
        </Grid>
  );
}

export default observer(ActivityDetails);