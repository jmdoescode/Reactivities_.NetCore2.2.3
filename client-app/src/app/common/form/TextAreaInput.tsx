import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, TextArea } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <TextArea rows={rows} {...input} placeholder={placeholder} type="text"></TextArea>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
