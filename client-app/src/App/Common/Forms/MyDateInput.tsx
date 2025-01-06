import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps } from "react-datepicker";



function MyDateInput(prop: DatePickerProps) {

    const [field, meta,helper] = useField(prop.name!);


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...prop}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helper.setValue(value)} 
            />
            {meta.touched && meta.error ? (
                <Label basic color="red" content={meta.error} />
            ):null}
        </Form.Field>
  );
}

export default MyDateInput;