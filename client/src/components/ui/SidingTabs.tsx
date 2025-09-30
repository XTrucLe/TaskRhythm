import { useState } from "react";

type TabItem = {
  name: string;
  label: string;
  icon?: React.ReactNode;
};

type SidingTabsProps = {
  items: TabItem[];
  value?: number;
  onChange?: (index: number) => void;
  className?: string;
};

export default function SidingTabs({
  items,
  value,
  onChange,
  className = "",
}: SidingTabsProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = value !== undefined ? value : internalIndex;

  const handleClick = (index: number) => {
    if (onChange) onChange(index);
    setInternalIndex(index);
  };

  return (
    <div className={`relative flex flex-row ${className}`}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={item.name}
            onClick={() => handleClick(index)}
            className={`relative flex-1 justify-center z-10 flex items-center gap-2 px-4 py-3 font-medium transition-colors
              ${
                isActive
                  ? "text-[var(--color-primary-dark)]"
                  : "text-gray-600 hover:text-gray-800"
              }
            `}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Highlight bar */}
      <span
        className="absolute bottom-0 h-1 bg-blue-500 rounded-md transition-all duration-300"
        style={{
          width: `${100 / items.length}%`,
          left: `${(100 / items.length) * activeIndex}%`,
        }}
      />
    </div>
  );
}
