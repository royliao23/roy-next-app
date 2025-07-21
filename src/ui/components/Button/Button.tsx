import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";
import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean; // Add disabled prop
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false, // Default value
}) => {
  const buttonClasses = [
    $.button,
    $[variant], // Apply variant class (primary, secondary, etc.)
    loading ? $.loading : "", // Loading state class
  ].join(" ").trim();

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // Disable when loading or explicitly disabled
      aria-busy={loading}
    >
      {loading && (
        <span data-testid="loading-spinner" className={$.spinner}>
          {/* Loading spinner SVG or element */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;