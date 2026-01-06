import { useState, useRef } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

type SearchBoxProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBox({ placeholder, value, onChange }: SearchBoxProps) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = () => {
    if (onChange) {
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    inputRef.current?.focus();
  };

  const handleExpand = () => {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(false);
  };  

  return (
    <div className="relative flex justify-end w-full bg-[var(--color-background-mix)]">
      <div
        className={`
            relative flex items-center rounded-md bg-background
            transition-all duration-300 ease-in-out
            border-strong
            ${
              expanded
                ? "w-full shadow-md"
                : "w-10"
            }
            max-w-56 md:w-full
          `}
      >
        <div
          onClick={handleExpand}
          className={`
            absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center
            cursor-pointer
            ${expanded ? "pointer-events-none" : ""}
            sm:pointer-events-none
          `}
        >
          <IoSearch size={18} className="text-muted" />
        </div>

        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder={placeholder ?? "Search"}
          value={value}
          onChange={onChange}
          onClick={handleExpand}
          className={`
            h-9 w-full bg-transparent pl-10 text-sm outline-none
            ${expanded ? "cursor-text" : "cursor-pointer"}
            sm:cursor-text
          `}
        />

        <div className="absolute right-1 flex items-center">
          {value ? (
            <IoClose
              size={18}
              className="cursor-pointer text-muted hover:text-foreground"
              onClick={handleRemove}
            />
          ) : (
            expanded && (
              <IoClose
                size={18}
                className="cursor-pointer text-muted sm:hidden"
                onClick={handleCollapse}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
