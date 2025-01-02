
import { useEffect, useState } from 'react'
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import DashboardActivity from '../../Features/activities/dashboard/DashboardActivity';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import agent from '../API/agent';
import LoadingComponent from '../Layout/LoadingComponent';
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {


        agent.Activities.list().then(response => {
            let activity: Activity[] = []

            response.forEach(activities => {

                activities.date = activities.date.split("T")[0];
                activity.push(activities)
            })
            
            setActivities(activity);
            setLoading(false);
        })
    }, [])

    function handleSelectedActivity(id: string) {
        setEditMode(false);
        setSelectedActivity(activities.find(m => m.id === id))
    }

    function handleCanceledActivity() {
        setSelectedActivity(undefined)

    }

    function handleFormOpen(id?: string) {
        id ? handleSelectedActivity(id) : handleCanceledActivity();
        setEditMode(true);
    }

    function handleEditOrAddActivity(activity: Activity) {
        setSubmitting(true);

        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(m => m.id !== activity.id), activity]);
                setEditMode(false);
                setSelectedActivity(activity);
                setSubmitting(false);
            })

        }
        else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity])
                setEditMode(false);
                setSelectedActivity(activity);
                setSubmitting(false);
            })
        }

   

    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setSubmitting(false);
            setActivities([...activities.filter(m => m.id !== id)])
        })
      
            
           
    }

    function handleFormClose() {
     
        setEditMode(false);
    }

    if (loading) return <LoadingComponent content={"Loading Application..." } />
    return (
        <>
          
                <NavBar handleFormOpen={handleFormOpen} />
                <Container style={{ marginTop: '5em' }}>
                <DashboardActivity activities={activities}
                    selectedActivity={selectedActivity}
                    handleSelectedActivity={handleSelectedActivity}
                    handleCanceledActivity={handleCanceledActivity}
                    handleFormOpen={handleFormOpen}
                    handleFormClose={handleFormClose}
                    editMode={editMode}
                    handleEditOrAddActivity={handleEditOrAddActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    submitting={submitting}


                />
                </Container>
               
         


        </>
    )
}

export default App


