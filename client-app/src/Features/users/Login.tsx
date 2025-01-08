import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../App/Common/Forms/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../App/Store/store";
import { observer } from "mobx-react-lite";

function Login() {
    const { userStore }=useStore()

    return (
        <Formik initialValues={{ email: '', password: '', error: null }}
            onSubmit={(value, { setErrors }) => userStore.login(value).catch(error => setErrors({ error: "Invalid username or password" }))}>
            {({ handleSubmit, isSubmitting, errors }) => (

                <Form className="ui form" onSubmit={handleSubmit}>
                    <Header as="h1" textAlign="center" color="teal" content="Login to Application"/>
                    <MyTextInput name="email" placeholder="Email"  />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage name="error" render={() => 

                        <Label content={errors.error} basic color="red" style={{marginBottom:10}} />
                    } />
                    <Button loading={isSubmitting} fluid type="submit" positive content="Login" />
                </Form>
            )}
        </Formik>
  );
}

export default observer(Login);