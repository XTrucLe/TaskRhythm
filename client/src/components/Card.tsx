import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "flat" | "brand";
  shadow?: "none" | "sm" | "md" | "lg";
};

export default function Card({
  children,
  className = "",
  variant = "default",
  shadow = "md",
}: CardProps) {
  const variants: Record<NonNullable<CardProps["variant"]>, string> = {
    default: "bg-white text-gray-900",
    outlined: "bg-white border border-gray-200 text-gray-900",
    flat: "bg-gray-50 text-gray-900",
    brand: "bg-indigo-600 text-white",
  };

  const shadows: Record<NonNullable<CardProps["shadow"]>, string> = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`
        rounded-2xl p-6
        ${variants[variant]}
        ${shadows[shadow]}
        ${className}
        duration-300 ease-in-out
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 font-semibold text-lg ${className}`}>{children}</div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-4 border-t pt-4 text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      {children}
    </div>
  );
}
