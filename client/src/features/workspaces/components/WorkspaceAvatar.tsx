import { useEffect, useState } from "react";

type WorkspaceAvatarProps = {
  logoUrl?: string;
  name?: string;
  size?: number;
};

function WorkspaceAvatar({ logoUrl, name, size = 48 }: WorkspaceAvatarProps) {
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    setIsImageError(false);
  }, [logoUrl]);

  return (
    <div className="shrink-0">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 p-[2px]">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[6px] bg-white dark:bg-zinc-800">
          {logoUrl && !isImageError ? (
            <img
              src={logoUrl}
              alt={name ?? "workspace"}
              onError={() => setIsImageError(true)}
              className="h-full w-full object-cover"
              style={{ width: size, height: size }}
            />
          ) : (
            <span
              className="select-none font-bold text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-pink-500"
              style={{ fontSize: size / 2 }}
            >
              {name?.charAt(0)?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceAvatar;
