import { useTheme } from "../hooks/useTheme";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <label className="relative inline-flex items-center cursor-pointer ">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={dark}
        onChange={() => toggleTheme()}
        className="hidden"
      />

      {/* Track */}
      <div
        className={`w-22 h-10 rounded-full relative overflow-hidden transition-colors duration-500
          ${
            dark ? "bg-[#0f2237]" : "bg-[#4BA3C3]"
          } shadow-[0_-1px_1px_rgba(0,0,0,0.25),0_1px_2px_rgba(255,255,255,0.94)]`}
      >
        {!dark && (
          <>
            <div
              className="absolute bottom-[-3px] right-2 w-6 h-6 bg-[#F3FDFF] rounded-full 
        shadow-[10px_-2px_#F3FDFF,18px_2px_#F3FDFF,28px_0px_#F3FDFF]"
            />
            <div
              className="absolute -bottom-2 right-8 w-5 h-5 bg-[#F3FDFF] rounded-full 
        shadow-[8px_0px_#F3FDFF,15px_1px_#F3FDFF]"
            />
          </>
        )}

        {/* Stars (night only) */}
        {dark && (
          <div className="absolute inset-0 text-white opacity-90">
            <span
              className="absolute animate-pulse text-[10px]"
              style={{ top: "5px", left: "4px" }}
            >
              ✦
            </span>
            <span
              className="absolute animate-pulse text-[8px]"
              style={{ top: "12px", left: "10px", animationDelay: "200ms" }}
            >
              ✧
            </span>
            <span
              className="absolute animate-pulse text-[11px]"
              style={{ top: "20px", left: "15px", animationDelay: "500ms" }}
            >
              ✦
            </span>
            <span
              className="absolute animate-pulse text-[9px]"
              style={{ top: "8px", left: "25px", animationDelay: "700ms" }}
            >
              ✧
            </span>
            <span
              className="absolute animate-pulse text-[11px]"
              style={{ top: "18px", left: "35px", animationDelay: "500ms" }}
            >
              ✦
            </span>
            <span
              className="absolute animate-pulse text-[9px]"
              style={{ top: "12px", left: "45px", animationDelay: "700ms" }}
            >
              ✧
            </span>
          </div>
        )}

        <div
          className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full shadow-md
    transition-transform duration-500
    ${dark ? "translate-x-[2.8rem]" : "translate-x-0"} will-change-transform`}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 3 vòng ánh sáng */}
            <div className="absolute w-full h-full rounded-full bg-white opacity-10 " />
            <div className="absolute w-[130%] h-[130%] rounded-full bg-white opacity-5  " />
            <div className="absolute w-[165%] h-[165%] rounded-full bg-white opacity-5  " />
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center z-1
            ${dark ? "bg-gray-400 relative" : "bg-yellow-400"}`}
          >
            {dark && (
              <>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-gray-500" />
                <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-gray-500" />
                <div className="absolute top-1 left-4 w-1 h-1 rounded-full bg-gray-500" />
              </>
            )}
          </div>
        </div>
      </div>
    </label>
  );
}
