import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface props {

    name: string;
    placeholder: string;
    options: { text: string, value: string }[];
    label?: string;

}

function MySelectInput(prop: props) {

    const [field, meta,helper] = useField(prop);


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{prop.label}</label>
            <Select clearable options={prop.options} placeholder={prop.placeholder}
                value={field.value || null}
                onChange={(_, d) => helper.setValue(d.value)}
                onBlur={() => helper.setTouched(true)}
            >
            </Select>
           
            {meta.touched && meta.error ? (
                <Label basic color="red" content={meta.error} />
            ):null}
        </Form.Field>
  );
}

export default MySelectInput;