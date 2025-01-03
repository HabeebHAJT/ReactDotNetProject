

import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    var location = useLocation()

    return (



        <>
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


