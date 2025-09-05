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
  size = "md" as keyof InputProps["size"],
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
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-600">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center w-full rounded-lg border 
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
          focus-within:ring-2 focus-within:ring-indigo-500 
          bg-white
        `}
      >
        {leftIcon && <span className="pl-3 text-gray-400">{leftIcon}</span>}
        <input
          className={`
            flex-1 bg-transparent focus:outline-none ${sizes[size]} ${className} text-gray-900
          `}
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
