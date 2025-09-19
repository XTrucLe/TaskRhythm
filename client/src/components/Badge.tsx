import React from "react";

interface BadgeProps {
  count?: number;
  max?: 10 | 100 | 1000;
  showDot?: boolean;
  color?: string;
  children?: React.ReactNode;
  className?: string;
  size?: number;
}

export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  max = 10,
  showDot = false,
  color = "bg-red-500",
  children,
  className = "absolute -top-1 -right-1",
  size = 8,
}) => {
  const displayCount = count > max ? `${max - 1}+` : count;

  const badgeContent = showDot ? null : displayCount;

  // Nếu không có count và không showDot, không render
  if (count <= 0 && !showDot) {
    return <>{children}</>;
  }

  const badgeClass = showDot
    ? `w-[${size}px] h-[${size}px] rounded-full ${color}`
    : `min-w-[1.25rem] h-5 px-1.5 rounded-full text-[0.625rem] font-semibold ${color} text-white flex items-center justify-center`;

  return (
    <div className="relative inline-block m-auto">
      {children}
      <span
        className={`${badgeClass} ${className} shadow-md flex items-center justify-center -top-2 -right-3 `}
      >
        {badgeContent}
      </span>
    </div>
  );
};
