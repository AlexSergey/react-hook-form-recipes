import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef(function InputComponent(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element {
  return <input ref={ref} className="form-control" {...props} />;
});
