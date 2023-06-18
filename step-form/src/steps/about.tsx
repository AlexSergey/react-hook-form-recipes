import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button, Field, Form } from '../forms';
import { useFormState } from '../store/hooks';

interface IAbout {
  about: string;
}

export const About = forwardRef(function About(props, ref): JSX.Element {
  const [state, setState] = useFormState();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      about: state.about,
    },
  });

  const saveData = (data: IAbout): void => {
    setState({ ...state, ...data });
  };

  return (
    <Form onSubmit={handleSubmit(saveData)} nextStep={'/confirm'}>
      <fieldset>
        <legend>About</legend>
        <Field label="About me">
          <textarea {...register('about')} id="about" className="form-control" />
        </Field>
        <div className="button-row">
          <Link className={`btn btn-secondary`} to="/education">
            {'<'} Previous
          </Link>
          <Button ref={ref}>Next {'>'}</Button>
        </div>
      </fieldset>
    </Form>
  );
});
