import { WorkspaceCard } from "../components/ui/WorkspaceCard";
import { HeaderAvatar } from "../components/ui/HeaderAvatar";
import { FiPlusCircle, FiSearch } from "react-icons/fi";

const workspaces = [
  {
    id: "w1",
    title: "Workspace A",
    description: "Quản lý dự án A cho khách hàng ABC",
    owner: { name: "John Doe", avatarUrl: "/avatars/john.png" },
    membersCount: 12,
    milestones: ["M1", "M2", "M3", "M4"],
    updatedAt: "2025-09-09T10:00:00Z",
    status: "Active" as const,
  },
  {
    id: "w2",
    title: "Workspace B",
    description: "Nghiên cứu nội bộ cho sản phẩm B",
    owner: { name: "Jane Smith", avatarUrl: "/avatars/jane.png" },
    membersCount: 8,
    milestones: ["M1", "M2"],
    updatedAt: "2025-09-05T15:30:00Z",
    status: "Archived" as const,
  },
];

function DashboardPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white shadow-sm px-6 py-3">
        <div className="font-bold text-lg text-gray-700">TaskRhythm</div>

        {/* Search */}
        <div className="hidden md:flex items-center w-1/3 bg-gray-100 rounded-lg px-3 py-1">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search workspaces..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-600"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            <FiPlusCircle /> New Workspace
          </button>
          <HeaderAvatar alt="John Doe" />
        </div>
      </div>

      {/* Workspace Cards */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              title={ws.title}
              description={ws.description}
              milestones={ws.milestones}
              owner={ws.owner}
              membersCount={ws.membersCount}
              updatedAt={ws.updatedAt}
              status={ws.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
