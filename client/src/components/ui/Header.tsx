import { FiBell } from "react-icons/fi";
import Logo from "./Logo";
import { SearchBox } from "./SearchBox";
import { ThemeSwitch } from "./ThemeSwitch";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  return (
    <header
      className="flex justify-between items-center px-6 shadow-md sticky top-0 z-50 select-none h-16 p-4"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <Logo className="cursor-pointer" />
      <SearchBox
        placeholder="Search...."
        size="md"
        onSearch={onSearch}
        trigger="onchange"
        className="max-w-md flex-1 mx-4"
      />
      <div className="flex p-2 rounded-lg gap-5 items-center">
        <ThemeSwitch />
        <Badge count={1000}>
          <FiBell
            color="var(--color-text-primary)"
            size={28}
            onClick={() => console.log("Click notification")}
          />
        </Badge>
        <Avatar name="Jonson" />
      </div>
    </header>
  );
}

export default Header;
