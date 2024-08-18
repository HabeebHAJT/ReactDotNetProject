

import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import { ListItem, List } from 'semantic-ui-react'
//import DuckItem from './assets/DuckItem'
//import { duck } from './assets/demo'

function App() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/Activity").then(response => {
            setActivities(response.data)
        })
    }, [])


    return (
        <>
            <div>
                <Header as='h2' color='red' icon='users' content='ReactActivities' />
                <List>
                    {activities.map((activity: any) => (
                        <ListItem key={activity.id}>{activity.title}</ListItem>
                    ))
                    }
                </List>
                {/*{duck.map(duck => (*/}
                {/*    <DuckItem key={duck.name} duck={duck} />*/}
                {/*))}*/}
            </div>


        </>
    )
}

export default App
