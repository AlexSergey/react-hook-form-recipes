import { useDispatch, useSelector } from 'react-redux';

import { IFormStepsState, setStep } from './slices/form-steps.slice';

import { IRootState } from './index';

export const useFormState = (): [IFormStepsState, (props: IFormStepsState) => void] => {
  const dispatch = useDispatch();
  const state = useSelector((s: IRootState) => s.formSteps);
  const setState = (s: IFormStepsState): void => {
    dispatch(setStep(s));
  };

  return [state, setState];
};
