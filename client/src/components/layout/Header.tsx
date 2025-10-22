import UserLogo from "../ui/Avatar";
import Logo from "../ui/Logo";
import { ThemeSwitch } from "../ui/ThemeSwitch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center bg-[var(--color-background-secondary)] justify-between px-4 py-2 shadow-lg">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <div className="flex items-center gap-6 pr-2">
        <ThemeSwitch />
        <UserLogo size={36} ring />
      </div>
    </header>
  );
}
