import AppLogo from "../../assets/logo.png";

export default function Logo({ size = 34 }: { size?: number }) {
  const fontsize = size * 0.6;
  return (
    <div
      className="flex items-center select-none cursor-pointer"
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      <img
        alt="Logo"
        draggable="false"
        src={AppLogo}
        className="w-auto"
        style={{ height: size }}
      />
      <span
        style={{ fontSize: fontsize }}
        className="-ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg"
      >
        TaskRhythm
      </span>
    </div>
  );
}
