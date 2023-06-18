import { debug } from 'node:util';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button, Field, Form, Input } from '../forms';
import { useFormState } from '../store/hooks';

interface IEducation {
  university: string;
  degree: string;
}
export const Education = forwardRef(function Education(props, ref): JSX.Element {
  const [state, setState] = useFormState();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      degree: state.degree,
      university: state.university,
    },
  });

  const saveData = (data: IEducation): void => {
    setState({ ...state, ...data });
  };

  return (
    <Form onSubmit={handleSubmit(saveData)} nextStep={'/about'}>
      <fieldset>
        <legend>Education</legend>
        <Field label="University">
          <Input {...register('university')} id="university" />
        </Field>
        <Field label="Degree">
          <Input {...register('degree')} id="degree" />
        </Field>
        <div className="button-row">
          <Link className={`btn btn-secondary`} to="/">
            {'<'} Previous
          </Link>
          <Button ref={ref}>Next {'>'}</Button>
        </div>
      </fieldset>
    </Form>
  );
});
