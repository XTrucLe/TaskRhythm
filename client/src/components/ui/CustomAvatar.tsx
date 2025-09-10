import React from "react";

interface CustomAvatarProps {
  src?: string;
  alt: string;
  size?: number;
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  alt,
  size = 28,
}) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className="rounded-full object-cover border border-gray-200"
      style={{ width: size, height: size }}
    />
  );
};
