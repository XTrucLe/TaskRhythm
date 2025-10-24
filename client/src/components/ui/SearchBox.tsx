import { IoSearch } from "react-icons/io5";

type SearchBoxProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBox({ placeholder, value, onChange }: SearchBoxProps) {
  return (
    <div className="flex items-center border-strong px-2 py-1 rounded min-w-[260px]">
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
        className="w-full outline-none text-md"
      />
    </div>
  );
}
export default SearchBox;
