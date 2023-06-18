import { forwardRef, useImperativeHandle, useRef, ButtonHTMLAttributes } from 'react';

type TButton = { variant?: string } & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(function Button({ children, variant = 'primary', ...props }: TButton, ref) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    click: (): void => {
      buttonRef.current?.click();
    },
  }));

  return (
    <button className={`btn btn-${variant}`} {...props} ref={buttonRef}>
      {children}
    </button>
  );
});
