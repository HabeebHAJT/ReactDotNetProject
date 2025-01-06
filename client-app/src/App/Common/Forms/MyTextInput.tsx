import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface props {

    name: string;
    placeholder: string;
    label?: string;

}

function MyTextInput(prop: props) {

    const [field, meta] = useField(prop);


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{prop.label}</label>
            <input {...field} {...prop} />
            {meta.touched && meta.error ? (
                <Label basic color="red" content={meta.error} />
            ):null}
        </Form.Field>
  );
}

export default MyTextInput;