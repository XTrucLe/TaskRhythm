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
    <div
      className="bg-[var(--color-card-bg)] rounded-2xl shadow-lg border border-[var(--color-card-border)] 
                hover:shadow-2xl transition-all duration-300 p-6 flex flex-col gap-6 group"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 min-w-0">
          {/* Avatar */}
          <div
            className="w-12 h-12 bg-[var(--color-primary-opacity-20)] flex items-center justify-center rounded-xl 
                    group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
          >
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {workspace.name.charAt(0)}
            </span>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xl text-[var(--color-text-primary)] truncate">
              {workspace.name}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)] mt-1 truncate">
              Workspace • {workspace.role}
            </p>
          </div>
        </div>

        {/* Badge */}
        <span
          className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] 
                   text-[var(--color-text-inverse)] text-xs font-semibold px-4 py-2 rounded-full 
                   shadow-lg transform group-hover:scale-105 transition-transform duration-300 
                   flex-shrink-0"
        >
          {workspace.role}
        </span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {Array.from({ length: 20 }, (_, index) => {
            const isActive = index < workspace.progress / 5;
            const angle = (index / 20) * 360 - 90;
            const radius = 50;

            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className={`absolute w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-[var(--color-success)] shadow-lg"
                    : "bg-[var(--color-neutral-300)]"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}
          <div className="absolute text-center">
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">
              {workspace.progress}%
            </span>
            <br />
            <span className="text-sm font-medium text-[var(--color-text-muted)]">
              Progress
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatItem
          label="Milestones"
          value={workspace.milestones}
          icon={<FaFlag size={18} className="text-[var(--color-warning)]" />}
        />
        <StatItem
          label="Total Tasks"
          value={workspace.totalTasks}
          icon={<FaTasks size={18} className="text-[var(--color-info)]" />}
        />
        <StatItem
          label="Assigned"
          value={workspace.taskAssigned}
          icon={
            <FaUserCheck size={18} className="text-[var(--color-primary)]" />
          }
        />
        <StatItem
          label="Completed"
          value={workspace.taskCompleted}
          icon={
            <FaCheckCircle size={18} className="text-[var(--color-success)]" />
          }
        />
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
  <div
    className="flex items-center gap-3 bg-[var(--color-neutral-50)] rounded-xl p-4 
                shadow-sm hover:shadow-md transition-all duration-300 group/stat"
  >
    <div className="p-2 bg-white rounded-lg shadow-sm group-hover/stat:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-[var(--color-text-primary)]">
        {value}
      </span>
      <span className="text-xs text-[var(--color-text-muted)] font-medium">
        {label}
      </span>
    </div>
  </div>
);

export default WorkspaceCard;
