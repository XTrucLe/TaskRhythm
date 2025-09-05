import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost:
      "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const spinnerColor =
    variant === "secondary" || variant === "outline" || variant === "ghost"
      ? "border-gray-600 dark:border-gray-300"
      : "border-white";

  return (
    <button
      className={`
        ${base} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span
          className={`animate-spin mr-2 h-4 w-4 border-2 ${spinnerColor} border-t-transparent rounded-full`}
        ></span>
      ) : (
        leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="ml-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
}
