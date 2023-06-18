import { FormEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export const Form = ({
  children,
  onSubmit,
  nextStep,
  ...props
}: {
  children: ReactNode;
  onSubmit: () => void;
  nextStep?: string;
}): JSX.Element => {
  const navigate = useNavigate();

  const onSubmitCustom = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
    if (typeof nextStep === 'string') {
      navigate(nextStep);
    }
  };

  return (
    <form className="row" onSubmit={onSubmitCustom} {...props} noValidate>
      {children}
    </form>
  );
};
