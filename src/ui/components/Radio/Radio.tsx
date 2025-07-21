import React, { FunctionComponent } from 'react';

import $ from './Radio.module.css';

interface RadioProps {
  id: string;
  name: string;
  value?: string; // Add this line
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const Radio: FunctionComponent<RadioProps> = ({ children, id, name, onChange, value, checked }) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={value} checked={checked} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
