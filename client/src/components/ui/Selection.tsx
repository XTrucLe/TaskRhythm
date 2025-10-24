import { useState } from "react";
import { InputField } from "./InputField";

interface Option {
  value: string;
  label: string;
}

interface SelectionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  multiple?: boolean;
  options: Option[];
}

function Selection({
  label,
  multiple,
  options,
  className,
  ...props
}: SelectionProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([
    props?.value?.toString() || "",
  ]);

  const toggleSelect = () => setOpen(!open);

  const handleOptionClick = (value: string) => {
    let newSelected: string[] = [];

    if (multiple) {
      if (selected.includes(value)) {
        newSelected = selected.filter((v) => v !== value);
      } else {
        newSelected = [...selected, value];
      }
    } else {
      newSelected = [value];
      setOpen(false); // single select auto close
    }

    setSelected(newSelected);
    if (props.onChange) {
      const value = multiple
        ? newSelected.join(", ")
        : newSelected[0].toString();
      props.onChange({
        target: { value, name: props.name },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <InputField
        label={label}
        {...props}
        value={selected
          .map((v) => options.find((o) => o.value === v)?.label)
          .join(", ")}
        readOnly
        onClick={toggleSelect}
      />

      {open && (
        <div className="absolute z-10 -mt-4 w-full rounded-md bg-surface border-strong shadow-lg max-h-40 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer select-none py-2 px-4 hover:bg-indigo-500 hover:text-white ${
                selected.includes(option.value)
                  ? "bg-[var(--color-primary-dark)] text-[var(--color-neutral-100)] font-semibold"
                  : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Selection;
