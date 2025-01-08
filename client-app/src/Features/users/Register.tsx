import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../App/Common/Forms/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../App/Store/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationError from "../Errors/ValidationError";

function Register() {
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Display Name Required"),
        username: Yup.string().required("User Name Required"),
        email: Yup.string().required("Email Required").email("Required valid Email"),
        password: Yup.string().required("Password Required"),
    
    });

    return (
        <Formik validationSchema={validationSchema} enableReinitialize initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(value, { setErrors }) => userStore.register(value).catch(error => setErrors({ error: error }))}>
            {({ handleSubmit, isSubmitting, dirty, isValid,errors }) => (

                <Form className="ui form error" onSubmit={handleSubmit}>
                    <Header as="h1" textAlign="center" color="teal" content="Register to Application" />
                    <MyTextInput name="displayName" placeholder="Display Name"  />
                    <MyTextInput name="username" placeholder="User Name"  />
                    <MyTextInput name="email" placeholder="Email"  />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage name="error" render={() =>

                        <ValidationError errors={errors.error as unknown as string[]}/>
                    } />
                    <Button loading={isSubmitting}
                        disabled={isSubmitting || !dirty || !isValid} fluid type="submit" positive content="Register" />
                </Form>
            )}
        </Formik>
  );
}

export default observer(Register);