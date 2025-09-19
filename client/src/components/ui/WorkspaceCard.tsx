import React from "react";
import { FaCheckCircle, FaFlag, FaTasks, FaUserCheck } from "react-icons/fa";

interface Workspace {
  id: string;
  name: string;
  role: string;
  milestones: number;
  totalTasks: number;
  taskAssigned: number;
  taskCompleted: number;
  progress: number; // %
}

const WorkspaceCard = React.memo(({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center rounded-xl"></div>
          <h1 className="font-bold text-lg text-gray-900">{workspace.name}</h1>
        </div>
        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {workspace.role}
        </span>
      </div>

      {/* Stats + Progress */}
      <div className="flex justify-between items-center gap-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Milestones"
            value={workspace.milestones}
            icon={<FaFlag size={16} />}
          />
          <StatItem
            label="Total Tasks"
            value={workspace.totalTasks}
            icon={<FaTasks size={16} />}
          />
          <StatItem
            label="Assigned"
            value={workspace.taskAssigned}
            icon={<FaUserCheck size={16} />}
          />
          <StatItem
            label="Completed"
            value={workspace.taskCompleted}
            icon={<FaCheckCircle size={16} />}
          />
        </div>
        {/* Progress */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          {Array.from({ length: 20 }, (_, index) => {
            const isActive = index < workspace.progress / 5;
            const angle = (index / 20) * 360 - 90; // Bắt đầu từ đỉnh
            const radius = 40;

            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? "bg-green-500 shadow-md" : "bg-gray-300"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}
          <span className="absolute text-center text-xs font-semibold text-gray-700 leading-tight">
            {workspace.progress}%
            <br />
            <span className="text-[10px] font-normal text-gray-500">
              Progress
            </span>
          </span>
        </div>
      </div>
    </div>
  );
});

interface StatItemProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
    <div className="text-gray-600 text-lg">{icon}</div>
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  </div>
);

export default WorkspaceCard;
