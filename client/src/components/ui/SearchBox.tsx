import { IoClose, IoSearch } from "react-icons/io5";

type SearchBoxProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBox({ placeholder, value, onChange }: SearchBoxProps) {
  const handleRemove = () => {
    if (onChange) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };
  return (
    <div className="relative flex items-center border-strong px-2 py-0.5 rounded min-w-48">
      <IoSearch
        className="inline mr-2"
        size={20}
        color="var(--color-text-muted)"
      />
      <input
        type="text"
        placeholder={placeholder ?? "Search"}
        value={value}
        onChange={onChange}
        className="w-full outline-none text-sm"
      />
      {value && value.length > 0 && (
        <IoClose
          className="absolute right-2 top-1/2 -translate-y-1/2"
          size={20}
          onClick={handleRemove}
        />
      )}
    </div>
  );
}
export default SearchBox;
