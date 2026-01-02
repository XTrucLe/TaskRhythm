import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

// Components
import Header from "../../components/layout/Header";
import WorkspaceHeader from "@/features/workspaces/components/WorkspaceHeader";
import WorkspaceTabView from "@/features/workspaces/components/WorkspaceTabView";
import ToolBox from "@/features/workspaces/components/ToolBox";

// Tabs
import ProjectTab from "@/features/workspaces/tabs/ProjectTab";
import MemberTab from "@/features/workspaces/tabs/MemberTab";
import SettingTab from "@/features/workspaces/tabs/SettingTab";

// Store & Types
import { useWorkspaceStore } from "@/features/workspaces/stores/useWorkspaceStore";
import type { Workspace } from "@/features/workspaces/types";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams();
  const [searchParams] = useSearchParams();

  // Lấy tab hiện tại, mặc định là projects
  const currentTab = searchParams.get("tab")?.toLowerCase() || "projects";

  const {
    workspace,
    fetchWorkspace,
    fetchProjects,
    fetchMembers,
    setSearch,
    searches,
  } = useWorkspaceStore();

  // Chỉ fetch lại khi workspaceId thay đổi
  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace(workspaceId);
      fetchProjects(workspaceId);
      fetchMembers(workspaceId);
    }
  }, [workspaceId, fetchWorkspace, fetchProjects, fetchMembers]);

  // Hàm render content sạch sẽ, không chứa Hook bên trong logic switch
  const renderTabContent = () => {
    switch (currentTab) {
      case "projects":
        return <ProjectTab />;
      case "members":
        return <MemberTab />;
      case "settings":
        return <SettingTab />;
      default:
        return <ProjectTab />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-3 px-6 max-w-7xl mx-auto no-select">
        {/* Border 1px tinh tế theo Line Style */}
        <div className="flex flex-col w-full items-center sm:flex-row mb-6 border-b-2">
          <WorkspaceHeader workspace={workspace as Workspace} />
          <WorkspaceTabView />

          <div className="ml-auto pb-2">
            <ToolBox
              titleTooltip="New Project"
              searchOnchange={(e) => setSearch(currentTab, e.target.value)}
              value={searches[currentTab] || ""}
              btnOnClick={() => {}}
            />
          </div>
        </div>

        <section className="animate-in fade-in duration-300">
          {renderTabContent()}
        </section>
      </main>
    </div>
  );
}
