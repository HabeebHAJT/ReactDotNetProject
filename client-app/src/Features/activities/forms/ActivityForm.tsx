import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined
    handleFormClose: () => void;
    handleEditOrAddActivity: (Activity: Activity) => void;
}
function ActivityForm({ activity: selectedActivity, handleFormClose, handleEditOrAddActivity }: Props) {

    const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: ""
    }

    const [activity, setActivity] = useState(initialState)

    function handlFormSubmission() {

        handleEditOrAddActivity(activity);

    }

    function handlInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    
    }

   

    return (
        <Segment clearing >
            <Form onSubmit={handlFormSubmission} autoComplete="off">
                <Form.Input placeholder='Tite' value={activity.title} name="title" onChange={handlInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name="description" onChange={handlInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name="category" onChange={handlInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name="date" onChange={handlInputChange} />
                <Form.Input placeholder='City' value={activity.city} name="city" onChange={handlInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handlInputChange} />
                <Button floated='right' content="Submit" positive></Button>
                <Button floated='right' onClick={handleFormClose} content="Cancel"></Button>
            </Form>
        </Segment>
  );
}

export default ActivityForm;