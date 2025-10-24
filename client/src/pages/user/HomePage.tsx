import { useState, useMemo } from "react";
import Header from "../../components/layout/Header";
import WorkspaceCard from "../../components/workspace/WorkspaceCard";
import { data as mockWorkspaceData } from "../../mock/workspace";
import SpeedDial from "../../components/ui/SpeedDial";
import useRouting from "../../hooks/useRouting";
import CreateWorkspaceModal from "../../components/modals/CreateNewWorkspace";
import JoinWorkspaceModal from "../../components/modals/JoinWorkspaceModal";

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

  const handleClickWorkspaceCard = (workspace: any) => {
    goWorkspace(workspace);
  };

  const renderSection = (title: string, items: any[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-[var(--color-primary-lighter)]">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              name={workspace.name}
              logo_url={workspace.logo_url || ""}
              total_members={workspace.total_members}
              total_project={workspace.total_project}
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
        {renderSection("My Workspaces", myWorkspaces)}
        {renderSection("Invited Workspaces", invitedWorkspaces)}
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
