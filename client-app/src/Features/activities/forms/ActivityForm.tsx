import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../App/Models/Activity";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { v4 as uuid } from 'uuid';


function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({

        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: ""
    })


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))

    }, [id, loadActivity]);

  

    function handlFormSubmission() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
       

    }

    function handlInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    
    }

    if (loadingInitial) return <LoadingComponent content="Loading..." />

    return (
        <Segment clearing >
            <Form onSubmit={handlFormSubmission} autoComplete="off">
                <Form.Input placeholder='Tite' value={activity.title} name="title" onChange={handlInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name="description" onChange={handlInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name="category" onChange={handlInputChange} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name="date" onChange={handlInputChange} />
                <Form.Input placeholder='City' value={activity.city} name="city" onChange={handlInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handlInputChange} />
                <Button floated='right' loading={loading} content="Submit" positive></Button>
                <Button floated='right' as={Link} to="/activities" content="Cancel"></Button>
            </Form>
        </Segment>
  );
}

export default observer(ActivityForm);