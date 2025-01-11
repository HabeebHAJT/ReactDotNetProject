import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../App/Models/Activity";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../App/Common/Forms/MyTextInput";
import MyTextArea from "../../../App/Common/Forms/MyTextArea";
import MySelectInput from "../../../App/Common/Forms/MySelectInput";
import { Categoryptions } from "../../../App/Common/Options/CategoryOptions";
import MyDateInput from "../../../App/Common/Forms/MyDateInput";
import { v4 as uuid } from 'uuid';


function ActivityForm() {

    const { activityStore } = useStore();
    const { loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("Title Required"),
        description: Yup.string().required("Decription Required"),
        category: Yup.string().required("Category Required"),
        venue: Yup.string().required("Venue Required"),
        city: Yup.string().required("City Required"),
        date: Yup.string().required("Date Required").nullable()
    });


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))

    }, [id, loadActivity]);

  

    function handlFormSubmission(activity: ActivityFormValues) {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
       

    }



    if (loadingInitial) return <LoadingComponent content="Loading..." />

    return (
        <Segment clearing >
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity}
                onSubmit={activity => handlFormSubmission(activity)}>
                {({ handleSubmit, dirty, isSubmitting, isValid }) => (
                    
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Header content="Activity Details" sub color="teal" />
                        <MyTextInput name="title" placeholder="title" />
                        <MyTextArea placeholder='Description' name="description" rows={3} />
                        <MySelectInput placeholder='Category' name="category" options={Categoryptions}  />
                        <MyDateInput
                            placeholderText='Date'
                            name="date"
                            showTimeSelect
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"


                        />
                        <Header content="Location Details" sub color="teal" />
                        <MyTextInput placeholder='City' name="city"  />
                        <MyTextInput placeholder='Venue'  name="venue"/>
                        <Button floated='right' loading={isSubmitting}
                            disabled={isSubmitting || !dirty || !isValid}
                            content="Submit" positive></Button>
                        <Button floated='right' as={Link} to="/activities" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>
            
        </Segment>
  );
}

export default observer(ActivityForm);