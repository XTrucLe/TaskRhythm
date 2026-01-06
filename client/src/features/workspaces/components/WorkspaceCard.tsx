import { FaChevronRight, FaFolderOpen, FaUsers } from "react-icons/fa";
import WorkspaceAvatar from "./WorkspaceAvatar";

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
      className="group relative w-full max-w-sm cursor-pointer select-none
          bg-[var(--color-surface-elevated)] dark:bg-surface-elevated 
          rounded-2xl border border-transparent dark:border-white/10
          shadow-sm hover:shadow-xl hover:-translate-y-1 
          p-4 flex items-center gap-4 
          transition-all duration-300 ease-out
        "
    >
      <WorkspaceAvatar logoUrl={logo_url} name={name} />

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <h3 className="text-lg font-bold truncate text-[var(--color-text-main)] group-hover:text-indigo-500 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <FaUsers size={12} className="text-gray-400" />
            <span className="font-medium">{total_members}</span>
            <span className="text-xs opacity-80">members</span>
          </div>

          <div className="w-[1px] h-3 bg-gray-300 dark:bg-gray-600" />

          <div className="flex items-center gap-1.5">
            <FaFolderOpen size={12} className="text-gray-400" />
            <span className="font-medium">{total_project}</span>
            <span className="text-xs opacity-80">projects</span>
          </div>
        </div>
      </div>

      <div className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300">
        <FaChevronRight size={18} />
      </div>
    </div>
  );
}
