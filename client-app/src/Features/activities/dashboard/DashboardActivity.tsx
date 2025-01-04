import { Grid } from "semantic-ui-react";
import ActivityListItems from "./ActivityListItems";
import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";



function DashboardActivity() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
   
    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
     
      
    }, [loadActivities])

    if (activityStore.loadingInitial) return <LoadingComponent content={"Loading Application..."} />
    return (
      <Grid>
            <Grid.Column width='10'>
                <ActivityListItems/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilter/>
                
            </Grid.Column>
      </Grid>
     
  );
}

export default observer(DashboardActivity);