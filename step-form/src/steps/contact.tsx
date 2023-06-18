import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Field, Form, Input } from '../forms';
import { useFormState } from '../store/hooks';

interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Contact = forwardRef(function Contact(props, ref) {
  const [state, setState] = useFormState();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      password: state.password,
    },
    mode: 'onSubmit',
  });
  const saveData = (data: IContact): void => {
    setState({ ...state, ...data });
  };

  return (
    <Form onSubmit={handleSubmit(saveData)} nextStep={'/education'}>
      <fieldset>
        <legend>Contact</legend>
        <Field label="First name">
          <Input {...register('firstName')} id="first-name" />
        </Field>
        <Field label="Last name">
          <Input {...register('lastName')} id="last-name" />
        </Field>
        <Field label="Email">
          <Input {...register('email')} type="email" id="email" />
        </Field>
        <Field label="Password">
          <Input {...register('password')} type="password" id="password" />
        </Field>
        <Button ref={ref}>Next {'>'}</Button>
      </fieldset>
    </Form>
  );
});
