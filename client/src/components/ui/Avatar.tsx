import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  rounded?: boolean;
  border?: boolean;
  status?: "online" | "offline";
  className?: string;
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = 40,
  rounded = true,
  border = false,
  status,
  className = "",
  name,
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${
            rounded ? "rounded-full" : "rounded-md"
          } ${border ? "border border-gray-300" : ""}`}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-gray-300 text-white font-semibold ${
            rounded ? "rounded-full" : "rounded-md"
          } ${border ? "border border-gray-300" : ""}`}
        >
          {firstLetter}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-[12px] h-[12px] rounded-full border-2 border-white ${
            status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
};
