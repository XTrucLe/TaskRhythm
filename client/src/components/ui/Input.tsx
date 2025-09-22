import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size,
  className = "",
  ...props
}: InputProps) {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}

      <div className={`input-base ${error ? "input-error" : ""}`}>
        {leftIcon && <span className="pl-3 text-gray-400">{leftIcon}</span>}

        <input
          className={`input-field ${sizes[size || "md"]} ${className}`}
          {...props}
        />

        {rightIcon && <span className="pr-3 text-gray-400">{rightIcon}</span>}
      </div>

      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
}
