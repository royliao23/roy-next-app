import React, { FunctionComponent } from "react";
import $ from "./InputText.module.css";

interface InputTextProps {
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'password'; // Add this line
}

const InputText: FunctionComponent<InputTextProps> = ({
  name,
  onChange,
  placeholder,
  value,
  disabled = false,
  type = 'text', // Add default value
}) => {
  return (
    <input
      aria-label={name}
      className={$.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type} // Use the prop
      value={value}
      disabled={disabled}
    />
  );
};

export default InputText;