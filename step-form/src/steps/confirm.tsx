import { useForm } from 'react-hook-form';

import { Button, Form, Section, SectionRow } from '../forms';
import { useFormState } from '../store/hooks';
import { IFormStepsState } from '../store/slices/form-steps.slice';

interface ISubmitData {
  name: string;
  required?: boolean;
  value: string;
}

export const Confirm = (): JSX.Element => {
  const [state] = useFormState();
  const { handleSubmit } = useForm({ defaultValues: state });

  const submitData = (data: IFormStepsState): void => {
    console.info(data);
    // Submit data to the server
  };

  const data = [
    {
      items: [
        { name: 'First name', required: true, value: state.firstName },
        { name: 'Last name', required: true, value: state.lastName },
        { name: 'Email', required: true, value: state.email },
        {
          name: 'Password',
          required: true,
          value: state.password ? '*****' : '',
        },
      ],
      title: 'Personal info',
      url: '/',
    },
    {
      items: [
        { name: 'University', value: state.university },
        { name: 'Degree', value: state.degree },
      ],
      title: 'Education',
      url: '/education',
    },
    {
      items: [{ name: 'About me', value: state.about }],
      title: 'About',
      url: '/about',
    },
  ];

  const disableSubmit = data.some((section) => section.items.some((item: ISubmitData) => item.required && !item.value));

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <h1 className="mb-4">Confirm</h1>
      {data.map(({ title, url, items }) => {
        return (
          <Section title={title} url={url} key={title}>
            {items.map(({ name, value, required }: ISubmitData) => {
              const isMissingValue = required && !value;

              return (
                <SectionRow key={name}>
                  <div className={isMissingValue ? 'text-warning' : ''}>{name}</div>
                  <div>{isMissingValue ? <span className={'warning-sign'}>!</span> : value}</div>
                </SectionRow>
              );
            })}
          </Section>
        );
      })}

      <div className="d-flex justify-content-start">
        <Button disabled={disableSubmit}>Submit</Button>
      </div>
    </Form>
  );
};
