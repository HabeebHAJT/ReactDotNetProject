

import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../Store/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import MyModel from '../Common/Model/MyModel';
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    var location = useLocation();
    const { userStore, commonStoere } = useStore();

    useEffect(() => {

        if (commonStoere.token)
        {
            userStore.getUser().finally(() => commonStoere.setAppLoaded());
        }
        else
        {
            commonStoere.setAppLoaded();
        }

    }, [commonStoere, userStore])

    if (!commonStoere.apploaded) return <LoadingComponent content="Loading App..."/>

    return (


        
        <>
            <MyModel/>
            <ToastContainer theme='colored' hideProgressBar position='bottom-right' />

            {location.pathname === "/" ? <HomePage /> :

                (<>
                    <NavBar />
                    <Container style={{ marginTop: '5em' }}>

                        <Outlet />
                    </Container>
                </>)
        }
          

        </>
    )
}

export default observer(App)


