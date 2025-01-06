import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface props {

    name: string;
    placeholder: string;
    rows:number,
    label?: string;

}

function MyTextArea(prop: props) {

    const [field, meta] = useField(prop);


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{prop.label}</label>
            <textarea {...field} {...prop} />
            {meta.touched && meta.error ? (
                <Label basic color="red" content={meta.error} />
            ):null}
        </Form.Field>
  );
}

export default MyTextArea;