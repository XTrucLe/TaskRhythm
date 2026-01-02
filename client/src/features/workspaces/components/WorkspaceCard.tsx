interface WorkspaceCardProps {
  logo_url?: string;
  name: string;
  total_members: number;
  total_project: number;
  onClick?: () => void;
}

export default function WorkspaceCard({
  logo_url,
  name,
  total_members,
  total_project,
  onClick,
}: WorkspaceCardProps) {
  return (
    <div
      onClick={onClick}
      className="max-w-lg cursor-pointer bg-[var(--color-surface-elevated)] dark:bg-surface-elevated rounded-2xl shadow-md dark:shadow-lg p-2 flex items-center space-x-4
                 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 no-select"
    >
      {/* Logo with gradient border */}
      <div className="flex-shrink-0 relative shadow-md rounded-full">
        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
          {logo_url ? (
            <img
              src={logo_url}
              alt={name}
              className="h-full w-full object-cover rounded-full select-none"
              draggable={false}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold select-none">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <h3 className="text-lg font-bold truncate text-[var(--color-info-dark)]">
          {name}
        </h3>

        <div className="flex space-x-4 text-sm mt-1">
          <span>{total_members} members</span>
          <span>{total_project} projects</span>
        </div>
      </div>
    </div>
  );
}
