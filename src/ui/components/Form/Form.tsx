import React, { FunctionComponent } from 'react';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';

// Align with InputTextProps
interface InputTextExtraProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'password'; // Match InputTextProps
}

interface FormEntry {
  name: string;
  placeholder: string;
  extraProps: InputTextExtraProps;
}

interface FormProps {
  label: string;
  loading?: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.FormEvent) => void;
  submitText: string;
  className?: string;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading = false,
  formEntries,
  onFormSubmit,
  submitText,
  className = ''
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset className={$.fieldset}>
        <legend className={$.legend}>{label}</legend>
        
        <div className={$.formContent}>
          {formEntries.map(({ name, placeholder, extraProps }, index) => (
            <div key={`${name}-${index}`} className={$.formRow}>
              <InputText
                name={name}
                placeholder={placeholder}
                value={extraProps.value}
                onChange={extraProps.onChange}
                disabled={loading || extraProps.disabled}
                type={extraProps.type} // Now properly typed
              />
            </div>
          ))}

          <Button 
            type="submit"
            loading={loading}
            disabled={loading} // Now properly typed
            variant="primary"
          >
            {submitText}
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;