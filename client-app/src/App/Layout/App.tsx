
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import DashboardActivity from '../../Features/activities/dashboard/DashboardActivity';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5001/api/Activity").then(response => {
            setActivities(response.data)
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

    function handleEditOrAddActivity(activity :Activity) {

        activity.id ?
            setActivities([...activities.filter(m => m.id !== activity.id), activity]) :
            setActivities([...activities, { ...activity, id: uuid() }])
        setEditMode(false);
        setSelectedActivity(activity)

    }

    function handleDeleteActivity(id:string) {
      
            setActivities([...activities.filter(m => m.id !== id)])
           
    }

    function handleFormClose() {
     
        setEditMode(false);
    }

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


                />
                </Container>
               
         


        </>
    )
}

export default App


