import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import SpeedDial from "@/components/ui/SpeedDial";
import CreateWorkspaceModal from "@/features/workspaces/components/CreateNewWorkspace";
import JoinWorkspaceModal from "@/features/workspaces/components/JoinWorkspaceModal";
import WorkspaceCard from "@/features/workspaces/components/WorkspaceCard";
import useRouting from "@/hooks/useRouting";
import { data as mockWorkspaceData } from "@/mock/workspace";
import type { Workspace } from "@/features/workspaces/types/workspace";

export default function HomePage() {
  const [workspaceData] = useState(mockWorkspaceData);
  const [recentWorkspaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const { goWorkspace } = useRouting();

  const myWorkspaces = useMemo(
    () => workspaceData.filter((ws) => ws.isOwner),
    [workspaceData]
  );

  const invitedWorkspaces = useMemo(
    () => workspaceData.filter((ws) => !ws.isOwner),
    [workspaceData]
  );

  const handleClickWorkspaceCard = (workspace: Workspace) => {
    goWorkspace(workspace);
  };

  const renderSection = (title: string, items: Workspace[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-[var(--color-primary-lighter)]">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              name={workspace.name}
              logo_url={workspace.logo_url || ""}
              total_members={workspace.total_members || 0}
              total_project={workspace.total_project || 0}
              onClick={() => handleClickWorkspaceCard(workspace)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-4 px-6 max-w-7xl mx-auto min-h-screen">
        {recentWorkspaces.length > 0 &&
          renderSection("Recent Workspaces", recentWorkspaces)}
        {renderSection("My Workspaces", myWorkspaces as Workspace[])}
        {renderSection("Invited Workspaces", invitedWorkspaces as Workspace[])}
      </main>
      <SpeedDial
        actions={[
          {
            icon: "➕",
            label: "New Workspace",
            onClick: () => {
              setModalOpen(true);
            },
          },
          {
            icon: "🔗",
            label: "Join Workspace",
            onClick: () => setJoinModalOpen(true),
          },
        ]}
      />
      <CreateWorkspaceModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <JoinWorkspaceModal isOpen={joinModalOpen} setIsOpen={setJoinModalOpen} />
    </div>
  );
}
