import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IFormStepsState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  about: string;
  university: string;
  degree: string;
}

const initialFormStepsState = {
  about: '',
  degree: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  university: '',
} as IFormStepsState;

const formStepsSlice = createSlice({
  initialState: initialFormStepsState,
  name: 'formSteps',
  reducers: {
    setStep(state, action: PayloadAction<IFormStepsState>) {
      console.log('action.payload', action.payload);

      return { ...state, ...action.payload };
    },
  },
});

const formStepsReducer = formStepsSlice.reducer;

export { formStepsReducer };

export const { setStep } = formStepsSlice.actions;
