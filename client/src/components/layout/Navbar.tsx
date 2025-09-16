import { useState } from "react";
import Logo from "../Logo";

type NavbarItem = { label: string; url?: string; position?: "top" | "bottom" };
type NavbarProps = { items: NavbarItem[] };

function Navbar({ items }: NavbarProps) {
  const [selected, setSelected] = useState(0);

  const topItems = items.filter((i) => i.position !== "bottom");
  const bottomItems = items.filter((i) => i.position === "bottom");

  return (
    <div className="flex flex-col h-screen w-48 bg-[var(--color-background)] border-r shadow-lg relative">
      <Logo
        size={50}
        className="w-full h-20 border-b border-[var(--color-border)]"
      />

      {/* Top menu */}
      <div className="relative flex flex-col">
        {topItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center min-h-[50px] h-[clamp(50px,100%,120px)] cursor-pointer"
            onClick={() => setSelected(index)}
          >
            <input
              id={`input-${index}`}
              type="radio"
              name="navbar"
              className="hidden"
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            <label
              htmlFor={`input-${index}`}
              className={`ml-3 font-medium transition-colors duration-300 ${
                selected === index
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              {item.label}
            </label>
          </div>
        ))}

        {/* Glider */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent">
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              height: `${100 / topItems.length}%`,
              transform: `translateY(${selected * 100}%)`,
              background:
                "linear-gradient(0deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
            }}
          >
            <div className="absolute top-1/2 h-[60%] w-[300%] -translate-y-1/2 bg-[var(--color-primary)] blur-md" />
            <div className="absolute left-0 h-full w-[175px] bg-gradient-to-r from-[var(--color-primary-opacity)] to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom menu */}
      <div className="flex flex-col border-t border-[var(--color-border)] mt-auto">
        {bottomItems.map((item, index) => (
          <div
            key={`bottom-${index}`}
            className="flex items-center min-h-[50px] h-[clamp(50px,100%,120px)] cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300"
          >
            <label
              className={`ml-3 font-medium ${
                selected ? "text[--color-text-primary]" : ""
              }`}
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
