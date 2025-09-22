import type { SelectHTMLAttributes, ReactNode } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function Select({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="select-label">{label}</label>}

      <div
        className={`select-wrapper ${error ? "select-error" : ""} ${className}`}
      >
        {leftIcon && <span className="select-icon-left">{leftIcon}</span>}

        <select className="select-field" {...props}>
          {children}
        </select>

        {rightIcon && <span className="select-icon-right">{rightIcon}</span>}
      </div>

      {error ? (
        <p className="select-error-text">{error}</p>
      ) : helperText ? (
        <p className="select-helper-text">{helperText}</p>
      ) : null}
    </div>
  );
}
