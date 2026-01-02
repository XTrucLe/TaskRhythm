import { FaFolder, FaUsers } from "react-icons/fa";
import type { Workspace } from "../types";

function WorkspaceHeader({ workspace }: { workspace: Workspace }) {
  return (
    <div className="flex items-center space-x-4 min-w-72 pb-2">
      <div>
        {workspace?.logo_url ? (
          <img
            src={workspace.logo_url}
            alt={workspace.name}
            className="w-16 h-16 rounded-full object-cover select-none border"
            draggable={false}
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-3xl font-semibold leading-none rounded-full select-none bg-gray-300 dark:bg-gray-600/20 shadow-md">
            {workspace?.name?.charAt(0).toUpperCase() || "W"}
          </div>
        )}

        {workspace?.isOwner && (
          <span className="text-[10px] bg-white text-black font-medium text-center px-1.5 rounded-xl z-10 absolute mt-[-12px] ml-7 border border-gray-300 shadow-md">
            Owner
          </span>
        )}
      </div>
      <div>
        <h2>{workspace?.name || "Workspace Overview"}</h2>
        <div className="flex items-center space-x-3 text-sm text-muted mt-1">
          <span className="flex items-center gap-1">
            <FaUsers size={13} /> {workspace?.total_members || 0} members
          </span>
          <span className="flex items-center gap-1">
            <FaFolder size={13} /> {workspace?.total_project || 0} projects
          </span>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
