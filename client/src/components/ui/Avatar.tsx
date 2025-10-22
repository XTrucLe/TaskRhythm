import { FaUser } from "react-icons/fa";

interface UserLogoProps {
  src?: string;
  size?: number;
  onClick?: () => void;
  rounded?: boolean;
  ring?: boolean;
}

// Component fallback icon
const DefaultUserAvatar = ({ size }: { size: number }) => {
  const iconSize = size * 0.6;

  return (
    <div
      className="flex items-center justify-center bg-gray-200 text-gray-500"
      style={{ height: size, width: size }}
    >
      <FaUser size={iconSize} />
    </div>
  );
};

export default function UserLogo({
  src,
  size = 40,
  onClick,
  rounded = true,
  ring = false,
}: UserLogoProps) {
  if (!src) {
    return (
      <div
        onClick={onClick}
        className={`${rounded ? "rounded-full overflow-hidden" : ""} ${
          ring ? "ring-2 ring-indigo-500" : ""
        } select-none cursor-pointer`}
        style={{ height: size, width: size }}
      >
        <DefaultUserAvatar size={size} />
      </div>
    );
  }

  return (
    <img
      alt="User Logo"
      src={src}
      onClick={onClick}
      draggable={false}
      style={{ height: size, width: size }}
      className={`select-none cursor-pointer object-cover ${
        rounded ? "rounded-full" : "rounded"
      } ${ring ? "ring-2 ring-indigo-500" : ""}`}
    />
  );
}
