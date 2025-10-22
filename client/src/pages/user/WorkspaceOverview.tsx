import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import { useEffect, useState } from "react";
import { FaGear, FaUserPlus, FaUsers, FaFolder } from "react-icons/fa6";
import { projects as mockProjects } from "../../mock/project";
import ProjectCard from "../../components/workspace/ProjectCard";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams();
  const { state } = useLocation();
  const [workspace] = useState(state || null);
  const [project, setProject] = useState<any[]>([]);

  useEffect(() => {
    // Nếu không có workspace trong state, có thể fetch từ API bằng workspaceId
    if (!workspace && workspaceId) {
      // Giả sử có hàm fetchWorkspaceById để lấy dữ liệu workspace
      // fetchWorkspaceById(workspaceId).then((data) => setWorkspace(data));
    }
    setProject(
      mockProjects.filter((proj) => proj.workspace_id === workspaceId)
    );
  }, [workspace, workspaceId]);

  return (
    <div>
      <Header />
      <main className="pt-6 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b pb-4">
          <div className="flex items-center space-x-4">
            {workspace?.logo_url ? (
              <img
                src={workspace.logo_url}
                alt={workspace.name}
                className="w-14 h-14 rounded-full object-cover select-none border"
                draggable={false}
              />
            ) : (
              <div className="w-14 h-14 flex items-center justify-center text-3xl font-semibold leading-none rounded-full select-none border bg-gray-300 dark:bg-gray-600/20">
                {workspace?.name?.charAt(0).toUpperCase() || "W"}
              </div>
            )}

            <div>
              <h1>{workspace?.name || "Workspace Overview"}</h1>
              <div className="flex items-center space-x-3 text-sm text-muted mt-1">
                <span className="flex items-center gap-1">
                  <FaUsers size={13} /> {workspace?.total_members || 0} members
                </span>
                <span className="flex items-center gap-1">
                  <FaFolder size={13} /> {workspace?.total_project || 0}{" "}
                  projects
                </span>
                {workspace?.isOwner && (
                  <span className="text-xs bg-primary text-inverse font-medium px-2 py-0.5 rounded-md">
                    Owner
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 bg-primary text-inverse px-4 py-2 rounded-full text-sm font-medium transition">
              <FaUserPlus size={14} /> Invite
            </button>
            <button className="p-2 rounded-full transition">
              <FaGear size={24} />
            </button>
          </div>
        </div>
        {/* Projects List */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[var(--color-primary-lighter)]">
            Projects
          </h2>
          {project.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No projects found in this workspace.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.map((proj) => (
                <ProjectCard key={proj.id} {...proj} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
