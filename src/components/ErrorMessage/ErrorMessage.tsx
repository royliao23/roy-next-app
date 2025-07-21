import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return message ? <div className={styles.error}>{message}</div> : null;
}