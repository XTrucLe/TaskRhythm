import { FaUserTie, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import type { Project } from "../types/project";

interface ProjectCardProps extends Project {
  project_lead_name?: string;
  onClick?: () => void;
}

const STATUS_META = {
  PLANNING: { label: "Planning", dot: "bg-warning"},
  IN_PROGRESS: { label: "In Progress", dot: "bg-info" },
  COMPLETED: { label: "Completed", dot: "bg-success" },
  ON_HOLD: { label: "On Hold", dot: "bg-error" },
} as const;

export default function ProjectCard({
  name,
  description,
  status = "PLANNING",
  start_date,
  end_date,
  total_tasks = 0,
  completed_tasks = 0,
  progress_rate = 0,
  project_lead_name,
  onClick,
}: ProjectCardProps) {
  const statusMeta = STATUS_META[status];
  const progress = Math.min(100, Math.max(0, progress_rate));

  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer max-w-96
        rounded-2xl border border-strong
        bg-background
        p-4 shadow-sm hover:shadow-md
        transition-all duration-200
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b pb-1">
        <h3 className="text-base font-semibold leading-tight truncate">
          {name}
        </h3>

        <div
          className="flex items-center gap-1 text-xs whitespace-nowrap font-bold p-1 px-2 rounded-md text-muted"
        >
          <span className={`w-2 h-2 rounded-full ${statusMeta.dot} `} />
          {statusMeta.label}
        </div>
      </div>


      {/* Description */}
      {description && (
        <p className="indent-2 mt-1 text-sm text-muted line-clamp-2 leading-5 min-h-[2.5rem]">
          {description}
        </p>
      )}

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full overlay-medium overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span
            className={`text-xs font-medium w-10 text-right ${
              progress === 100 ? "text-success" : "text-muted"
            }`}
          >
            {progress === 100 ? "Done" : `${progress}%`}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <FaUserTie size={12} />
          <span className="truncate max-w-[120px]">
            {project_lead_name || "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FaCheckCircle size={12} className="text-success" />
          <span>
            {completed_tasks}/{total_tasks}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FaCalendarAlt size={12} />
          <span>
            {start_date || "--"} → {end_date || "--"}
          </span>
        </div>
      </div>
    </div>
  );
}
