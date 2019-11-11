import React from 'react';
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from 'react-widgets';

interface IProps
  extends FieldRenderProps<Date, HTMLInputElement>,
    FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
    input,
    width,
    placeholder,
    date = false,
    time = false,
    meta: { touched, error },
    ...rest //11.143 - to give us access to the rest of the properties in the daytime picker
  }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
          <DateTimePicker
            placeholder={placeholder}
            date={date}
            time={time}
            value={input.value || null} //11.143 - || is in case we're creating
            onChange={input.onChange}
            {...rest}
          />
          {touched && error && (
              <Label basic color='red'>
                  {error}
              </Label>
          )}
        </Form.Field>
    )
}
