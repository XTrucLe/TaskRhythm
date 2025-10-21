import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  type = "text",
  className = "",
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        <input
          id={props.id}
          type={inputType}
          className={`input-element ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <span
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </span>
        )}
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : helperText ? (
        <div className="success-message">{helperText}</div>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
};
