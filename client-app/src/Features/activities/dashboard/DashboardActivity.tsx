import { Grid } from "semantic-ui-react";
import ActivityListItems from "./ActivityListItems";

import ActivityForm from "../forms/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";
import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";



function DashboardActivity() {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;
    return (
      <Grid>
            <Grid.Column width='10'>
                <ActivityListItems/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode&& <ActivityDetails/>}

                {editMode && <ActivityForm />}
                
            </Grid.Column>
      </Grid>
     
  );
}

export default observer(DashboardActivity);