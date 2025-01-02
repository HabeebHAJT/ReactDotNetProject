import { Grid } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import ActivityListItems from "./ActivityListItems";

import ActivityForm from "../forms/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";

interface Props {

    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectedActivity:(id: string) => void;
    handleCanceledActivity: () => void;
    handleFormOpen: (id:string) => void;
    handleFormClose: () => void;
    editMode: boolean;
    handleEditOrAddActivity: (Activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean
}

function DashboardActivity({ activities, selectedActivity, handleCanceledActivity, handleSelectedActivity, handleFormOpen, handleFormClose, editMode, handleEditOrAddActivity, handleDeleteActivity, submitting }: Props) {
    return (
      <Grid>
            <Grid.Column width='10'>
                <ActivityListItems activities={activities}
                    handleSelectedActivity={handleSelectedActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode&& <ActivityDetails
                    activity={selectedActivity}
                    handleCanceledActivity={handleCanceledActivity}
                    handleFormOpen={handleFormOpen }

                />}
                
                {editMode && <ActivityForm
                    activity={selectedActivity}
                    handleFormClose={handleFormClose}
                    handleEditOrAddActivity={handleEditOrAddActivity } 
                    submitting={submitting } 
                />}
                
            </Grid.Column>
      </Grid>
     
  );
}

export default DashboardActivity;