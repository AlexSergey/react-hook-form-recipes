import { configureStore } from '@reduxjs/toolkit';

import { IFormStepsState, formStepsReducer } from './slices/form-steps.slice';

export const store = configureStore({
  preloadedState: {},
  reducer: {
    formSteps: formStepsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export interface IRootState {
  formSteps: IFormStepsState;
}
