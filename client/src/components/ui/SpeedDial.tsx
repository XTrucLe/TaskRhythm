import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

type Action = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function SpeedDial({ actions }: { actions: Action[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-center no-select"
      ref={ref}
    >
      {/* Action buttons */}
      <div
        className={`flex flex-col items-center mb-3 space-y-3 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="relative group"
          >
            <span className="absolute right-12 top-1/2 -translate-y-1/2  text-sm rounded-lg p-2 whitespace-nowrap bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] shadow-md ">
              {action.label}
            </span>

            <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-[var(--color-background-secondary)]">
              {action.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Main button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition transform"
      >
        <div
          className={`transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <FaPlus size={22} />
        </div>
      </button>
    </div>
  );
}
