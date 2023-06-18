import { Children, ReactNode, isValidElement } from 'react';

// Get id prop from a child element
export const getChildId = (children: ReactNode): string => {
  const child = Children.only<ReactNode>(children);

  if (!child) {
    return '';
  }

  if (!isValidElement(child)) {
    return '';
  }

  return child?.props?.id;
};
export const Field = ({
  children,
  label,
  error,
}: {
  children: ReactNode;
  label?: ReactNode;
  error?: Error;
}): JSX.Element => {
  const id = getChildId(children);

  return (
    <div className="col-sm-12 mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {children}
      {error && <small className="error">{error.message}</small>}
    </div>
  );
};
