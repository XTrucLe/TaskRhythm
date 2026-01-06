import { FaFolder, FaUsers } from "react-icons/fa";
import type { Workspace } from "../types";
import WorkspaceAvatar from "./WorkspaceAvatar";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";

function WorkspaceInfo({ workspace }: { workspace: Workspace }) {
  return (
    <div className="flex items-center self-start space-x-4 min-w-72 pb-2">
      <WorkspaceAvatar logoUrl={workspace?.logo_url} name={workspace?.name} />
      <div>
        <h2 className="truncate text-md font-medium leading-tight">
          {workspace?.name || ""}
        </h2>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            {workspace?.isOwner ? (
              <IoLockClosed size={14} />
            ) : (
              <IoLockOpen size={14} />
            )}
            {workspace?.isOwner ? "Private" : "Public"}
          </span>
          <span className="flex items-center gap-1">
            <FaUsers size={13} />
            {workspace?.total_members || 0}
          </span>

          <span className="flex items-center gap-1">
            <FaFolder size={13} />
            {workspace?.total_project || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceInfo;
