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
  return (
    <div
      className={`
        card
        card-${variant}
        card-shadow-${shadow}
        ${className}
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
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}
