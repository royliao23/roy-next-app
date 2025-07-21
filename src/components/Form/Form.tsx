import React from 'react';
import styles from './Form.module.css';

interface FormProps {
  legend: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export default function Form({ legend, onSubmit, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
}