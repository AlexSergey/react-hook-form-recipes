import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useFormState } from '../store/hooks';

const StepState = ({
  showWarning,
  showSuccess,
}: {
  showWarning: boolean | undefined;
  showSuccess: boolean | undefined;
}): JSX.Element | null => {
  if (showWarning) {
    return <span className={'warning-sign'}>!</span>;
  }
  if (showSuccess) {
    return (
      <div className="checkmark">
        <div className="circle"></div>
        <div className="stem"></div>
        <div className="tick"></div>
      </div>
    );
  }

  return null;
};
export const Stepper = ({ onStepChange }: { onStepChange: () => void }): JSX.Element => {
  const [state] = useFormState();
  const location = useLocation();
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    setSteps((stps) => [...stps, location.pathname]);
  }, [location]);

  const getLinkClass = ({ isActive }: { isActive: boolean }): string => `nav-link ${isActive ? 'active' : undefined}`;

  const contactInfoMissing = !state.firstName || !state.lastName || !state.email || !state.password;

  const educationInfoMissing = !state.university || !state.degree;
  const aboutInfoMissing = !state.about;
  const isVisited = (step: string): boolean => steps.includes(step) && location.pathname !== step;

  const navLinks = [
    {
      name: 'Contact',
      state: {
        showSuccess: isVisited('/') && !contactInfoMissing,
        showWarning: isVisited('/') && contactInfoMissing,
      },
      url: '/',
    },
    {
      name: 'Education',
      state: {
        showSuccess: isVisited('/education') && !educationInfoMissing,
        showWarning: isVisited('/education') && educationInfoMissing,
      },
      url: '/education',
    },
    {
      name: 'About',
      state: {
        showSuccess: isVisited('/about') && !aboutInfoMissing,
        showWarning: isVisited('/about') && aboutInfoMissing,
      },
      url: '/about',
    },
    {
      name: 'Confirm',
      state: {},
      url: '/confirm',
    },
  ];

  return (
    <nav className="stepper navbar navbar-expand-lg">
      <div className="collapse navbar-collapse">
        <ol className="navbar-nav">
          {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
          {navLinks.map(({ url, name, state }) => {
            return (
              <li className="step nav-item" key={url}>
                <StepState showWarning={state.showWarning} showSuccess={state.showSuccess} />
                <NavLink end to={url} className={getLinkClass} onClick={onStepChange}>
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
