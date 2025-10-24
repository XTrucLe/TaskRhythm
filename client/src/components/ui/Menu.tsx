import React, { useEffect, useRef, useState } from "react";

type MenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  className?: string;
  children?: React.ReactNode;
};

function Menu({
  isOpen,
  toggleMenu,
  triggerRef,
  className,
  children,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }>({});

  // Update position khi menu mở
  useEffect(() => {
    const updateMenuPosition = () => {
      if (!triggerRef.current || !menuRef.current) return;

      const t = triggerRef.current.getBoundingClientRect();
      const m = menuRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const padding = 8;

      // Dọc: bottom mặc định
      const enoughBottom = t.bottom + m.height + padding <= vh;
      const enoughTop = t.top - m.height - padding >= 0;
      const top = enoughBottom
        ? t.bottom + scrollY
        : enoughTop
        ? undefined
        : Math.max(padding + scrollY, vh - m.height + scrollY - padding);
      const bottom =
        !enoughBottom && enoughTop ? vh - t.top + scrollY : undefined;

      // Ngang: right mặc định
      const enoughRight = t.right - m.width + padding <= vw;
      const enoughLeft = t.left + m.width - padding >= 0;
      const left = enoughRight
        ? t.right - m.width + scrollX
        : !enoughRight && enoughLeft
        ? undefined
        : Math.max(padding + scrollX, vw - m.width + scrollX - padding);
      const right =
        !enoughRight && enoughLeft ? vw - t.left + scrollX : undefined;

      setMenuPosition({ top, bottom, left, right });
    };

    if (isOpen) {
      updateMenuPosition();
      // Cập nhật khi resize
      const handleResize = () => updateMenuPosition();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isOpen, triggerRef]);

  // Click ngoài menu để đóng
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, toggleMenu, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: menuPosition.top,
        bottom: menuPosition.bottom,
        left: menuPosition.left,
        right: menuPosition.right,
        zIndex: 9999,
      }}
      className={`menu ${className || ""}`}
    >
      {children}
    </div>
  );
}

const MenuItem = ({
  children,
  onClick,
  icon,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  type?: "danger";
}) => {
  return (
    <div
      className={`menu-item ${type === "danger" ? "danger-color" : ""} `}
      onClick={onClick}
    >
      {icon && <div className="text-lg">{icon}</div>}
      {children}
    </div>
  );
};

export { Menu, MenuItem };
