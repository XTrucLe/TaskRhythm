type MemberAvatarProps = {
  url?: string;
  name?: string;
  size?: number;
};

function MemberAvatar({ url, name, size = 40 }: MemberAvatarProps) {
  return (
    <div
      className="rounded-full bg-gray-300"
      style={{ width: size, height: size }}
    >
      {url ? (
        <img
          src={url}
          alt={name ?? "member"}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center select-none font-bold text-white"
          style={{ fontSize: size / 2 }}
        >
          {name?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
      )}
    </div>
  );
}

export default MemberAvatar;
