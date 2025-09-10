import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiBell, FiLogOut } from "react-icons/fi";

interface AvatarProps {
  src?: string; // URL avatar
  alt?: string; // fallback text
  size?: number; // pixel
}

export const HeaderAvatar: React.FC<AvatarProps> = ({
  src,
  alt = "User",
  size = 36,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = alt ? alt[0].toUpperCase() : "U";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 ml-3 cursor-pointer ring-1 ring-gray-300 hover:ring-blue-400 transition"
        style={{ width: size, height: size }}
        title={alt}
      >
        {src ? (
          <img src={src} alt={alt} className="object-cover w-full h-full" />
        ) : (
          <span className="text-sm font-semibold text-white">{initials}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 z-50
                     origin-top-right animate-scale-fade"
        >
          {/* Profile group */}
          <div className="px-2 py-2">
            <DropdownItem icon={<FiUser />} label="Profile" />
            <DropdownItem icon={<FiSettings />} label="Workspace Settings" />
            <DropdownItem icon={<FiBell />} label="Notifications" />
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Logout */}
          <div className="px-2 py-2">
            <DropdownItem
              icon={<FiLogOut />}
              label="Logout"
              danger
              onClick={() => console.log("Logout")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  label,
  danger,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors
      ${
        danger
          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
  >
    <span className="mr-2">{icon}</span> {label}
  </button>
);
