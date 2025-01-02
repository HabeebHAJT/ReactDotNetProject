

import NavBar from './NavBar';
import DashboardActivity from '../../Features/activities/dashboard/DashboardActivity';
import { Container } from 'semantic-ui-react';
import LoadingComponent from '../Layout/LoadingComponent';
import { useStore } from '../Store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    const { activityStore } = useStore();




    useEffect(() => {
        activityStore.loadActivity();

    
    }, [])

   



 

   

    if (activityStore.loadingInitial) return <LoadingComponent content={"Loading Application..."} />
    return (
        <>

            <NavBar />
            <Container style={{ marginTop: '5em' }}>

                <DashboardActivity />
            </Container>




        </>
    )
}

export default observer(App)


