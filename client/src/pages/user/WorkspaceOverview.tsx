import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import WorkspaceInfo from "@/features/workspaces/components/WorkspaceInfo";
import WorkspaceTabView from "@/features/workspaces/components/WorkspaceTabView";
import ProjectTab from "@/features/workspaces/tabs/ProjectTab";
import MemberTab from "@/features/workspaces/tabs/MemberTab";
import SettingTab from "@/features/workspaces/tabs/SettingTab";
import { useWorkspaceStore } from "@/features/workspaces/stores/useWorkspaceStore";
import type { Workspace } from "@/features/workspaces/types";
import SearchBox from "@/components/ui/SearchBox";
import { NewButton } from "@/features/workspaces/components/NewButton";
import type { NewButtonType } from "@/features/workspaces/types/new_button";
import { FaPlus } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams();
  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab")?.toLowerCase() || "projects";

  const {
    workspace,
    fetchWorkspace,
    fetchProjects,
    fetchMembers,
    setSearch,
    searches,
  } = useWorkspaceStore();

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace(workspaceId);
      fetchProjects(workspaceId);
      fetchMembers(workspaceId);
    }
  }, [workspaceId, fetchWorkspace, fetchProjects, fetchMembers]);

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

  const newButtonProps: NewButtonType = {
    PROJECTS: {
      title: "New Project",
      onClick: () => {},
      icon: <FaPlus size={14} />,
    },
    MEMBERS: {
      title: "Add Member",
      onClick: () => {},
      icon: <IoPersonAdd size={14} />,
    },
    SETTINGS: { title: "New Setting", onClick: () => {}, icon: <></> },
  };

  const renderNewButton = () => {
    switch (currentTab) {
      case "projects":
        return <NewButton {...newButtonProps.PROJECTS} />;
      case "members":
        return <NewButton {...newButtonProps.MEMBERS} />;
      case "settings":
        return <></>;
      default:
        return <NewButton {...newButtonProps.PROJECTS} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col w-full min-h-screen no-select">
        <header className="relative z-20 w-full shadow-sm">
          <div className="mx-auto max-w-7xl px-2 pt-3 md:px-4 lg:px-6 space-y-3 lg:space-y-0">
            <div className="flex items-center gap-2">
              <WorkspaceInfo workspace={workspace as Workspace} />

              <div className="hidden lg:flex items-center gap-2 self-end">
                <div className="flex-1 min-w-0">
                  <WorkspaceTabView />
                </div>
              </div>

              <div className="absolute md:static right-2 md:flex-1 min-w-0">
                <SearchBox
                  value={searches[currentTab] || ""}
                  onChange={(e) => setSearch(currentTab, e.target.value)}
                />
              </div>

              <div className="hidden md:block shrink-0">
                {renderNewButton()}
              </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden self-end">
              <div className="flex-1 min-w-0">
                <WorkspaceTabView />
              </div>

              <div className="md:hidden shrink-0 mb-1">{renderNewButton()}</div>
            </div>
          </div>
        </header>

        <section className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 animate-in fade-in duration-300">
          {renderTabContent()}
        </section>
      </main>
    </div>
  );
}
