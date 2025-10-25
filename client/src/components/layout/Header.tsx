import { useEffect, useRef, useState } from "react";
import UserLogo from "../ui/Avatar";
import Logo from "../ui/Logo";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { Menu, MenuItem } from "../ui/Menu";
import {
  FiUser,
  FiSettings,
  FiBell,
  FiHelpCircle,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";
import { authService } from "../../services/authService";
import SearchBox from "../ui/SearchBox";

export default function Header({ showSearch }: { showSearch?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const posRef = useRef<HTMLButtonElement>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const getInfo = () => {
      localStorage.getItem("userInfo");

      const storedInfo = localStorage.getItem("currentUser");
      if (storedInfo) {
        const parsedInfo = JSON.parse(storedInfo);
        setUserInfo({
          name: parsedInfo.fullName,
          email: parsedInfo.email,
        });
      }
    };
    getInfo();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center bg-[var(--color-background-secondary)] justify-between px-4 py-2 shadow-lg">
      {/* Logo */}
      <Logo />
      <div />
      {showSearch && <SearchBox placeholder="Search..." />}
      {/* Navigation */}
      <div className="flex items-center gap-6 pr-2">
        <ThemeSwitch />
        <button ref={posRef}>
          <UserLogo size={36} ring onClick={toggleMenu} />
        </button>
      </div>
      <Menu
        isOpen={menuOpen}
        toggleMenu={toggleMenu}
        triggerRef={posRef}
        className="!rounded-xl border-strong"
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <UserLogo size={34} />
          <div className="flex flex-col">
            <span className="font-semibold">{userInfo.name}</span>
            <span className="text-sm text-muted">{userInfo.email}</span>
          </div>
        </div>
        <div className="divider" />

        <MenuItem onClick={() => {}} icon={<FiUser />} children={"Profile"} />
        <MenuItem
          onClick={() => {}}
          icon={<FiSettings />}
          children={"Settings"}
        />
        <MenuItem
          onClick={() => {}}
          icon={<FiBell />}
          children={"Notifications"}
        />
        <div className="divider" />
        <MenuItem
          onClick={() => {}}
          icon={<FiHelpCircle />}
          children={"Help"}
        />
        <MenuItem onClick={() => {}} icon={<FiInfo />} children={"About"} />
        <div className="divider" />
        <MenuItem
          onClick={() => authService.logout()}
          type="danger"
          icon={<FiLogOut className="text-current" />}
          children={"Logout"}
        />
      </Menu>
    </header>
  );
}
