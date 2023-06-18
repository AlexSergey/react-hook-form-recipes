import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { About } from './steps/about';
import { Confirm } from './steps/confirm';
import { Contact } from './steps/contact';
import { Education } from './steps/education';
import { Stepper } from './steps/steppers';

export const App = (): JSX.Element => {
  const buttonRef = useRef<HTMLElement>();

  const onStepChange = (): void => {
    buttonRef.current?.click();
  };

  return (
    <div className="App">
      <Router>
        <Stepper onStepChange={onStepChange} />
        <Routes>
          <Route path="/" element={<Contact ref={buttonRef} />} />
          <Route path="/about" element={<About ref={buttonRef} />} />
          <Route path="/education" element={<Education ref={buttonRef} />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Router>
    </div>
  );
};
