import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "./../../app/common/form/TextInput";
import { Form, Button, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useContext } from "react";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { Label } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password")
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && (
            <Label color="red" basic content={submitError.statusText} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content="Login"
            fluid
          />
        </Form>
      )}
    />
  );
};
