import { useTheme } from "../../hooks/useTheme";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={dark}
        onChange={toggleTheme}
        className="hidden"
      />

      {/* Track */}
      <div
        className={`
          relative w-14 h-7 rounded-full overflow-hidden
          transition-colors duration-500
          ${dark ? "bg-[#0f2237]" : "bg-[#4BA3C3]"}
          shadow-[0_-1px_1px_rgba(0,0,0,0.25),0_1px_2px_rgba(255,255,255,0.6)]
        `}
      >
        {/* Clouds (day) */}
        {!dark && (
          <>
            <div
              className="absolute bottom-[-2px] right-1.5 w-4 h-4 bg-[#F3FDFF] rounded-full
              shadow-[6px_-1px_#F3FDFF,12px_1px_#F3FDFF]"
            />
            <div
              className="absolute -bottom-2 right-6 w-3 h-3 bg-[#F3FDFF] rounded-full
              shadow-[6px_0px_#F3FDFF]"
            />
          </>
        )}

        {/* Stars (night) */}
        {dark && (
          <div className="absolute inset-0 text-white opacity-90">
            <span
              className="absolute text-[8px] animate-pulse"
              style={{ top: 4, left: 4 }}
            >
              ✦
            </span>
            <span
              className="absolute text-[7px] animate-pulse"
              style={{ top: 11, left: 10, animationDelay: "200ms" }}
            >
              ✧
            </span>
            <span
              className="absolute text-[8px] animate-pulse"
              style={{ top: 16, left: 18, animationDelay: "400ms" }}
            >
              ✦
            </span>
            <span
              className="absolute text-[7px] animate-pulse"
              style={{ top: 0, left: 20, animationDelay: "600ms" }}
            >
              ✧
            </span>
            <span
              className="absolute text-[8px] animate-pulse"
              style={{ top: 9, left: 25, animationDelay: "800ms" }}
            >
              ✦
            </span>
          </div>
        )}

        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2
            w-9 h-9 rounded-full
            flex items-center justify-center
            shadow-md transition-transform duration-500
            ${dark ? "translate-x-[1.5rem]" : "-translate-x-[0.1rem]"}
          `}
        >
          {/* Glow rings */}
          <div className="absolute inset-0 rounded-full bg-white opacity-10" />
          <div className="absolute w-[130%] h-[130%] rounded-full bg-white opacity-5" />

          {/* Icon */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center relative
              ${dark ? "bg-gray-400" : "bg-yellow-400"}
            `}
          >
            {dark && (
              <>
                <div className="absolute top-1 left-1 w-1 h-1 bg-gray-500 rounded-full" />
                <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-gray-500 rounded-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </label>
  );
}
