import { FaCalendarAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";

interface ProjectCardProps {
  name: string;
  description?: string;
  status?: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
  start_date?: string;
  end_date?: string;
  total_tasks?: number;
  completed_tasks?: number;
  progress_rate?: number;
  project_lead_name?: string;
  onClick?: () => void;
}

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
  const statusColors: Record<string, string> = {
    PLANNING: "warning",
    IN_PROGRESS: "info",
    COMPLETED: "success",
    ON_HOLD: "danger",
  };

  return (
    <div
      onClick={onClick}
      className="backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border-gray-700/50 p-5 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold leading-tight truncate">{name}</h3>
        <span
          className={`px-1 py-1.5 text-xs font-medium rounded-full w-28 text-center ${statusColors[status]}`}
        >
          {status.replace("_", " ")}
        </span>
      </div>
      <div className="divider"></div>
      {/* Description */}
      {description && (
        <p
          className="text-sm line-clamp-2 mb-3 indent-1"
          style={{
            lineHeight: "1.25rem",
            minHeight: "2.5rem",
          }}
        >
          {description}
        </p>
      )}

      {/* Dates */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <FaCalendarAlt size={12} /> {start_date || "--/--/----"}
        </span>
        <span className="flex items-center gap-1">
          <FaCalendarAlt size={12} /> {end_date || "--/--/----"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200/10 dark:bg-gray-800/20 h-2 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress_rate}%` }}
        ></div>
      </div>
      <div className="text-xs text-right text-muted mb-3">
        {progress_rate.toFixed(0)}%
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-muted">
        <div className="flex items-center gap-2">
          <FaUserTie size={14} />
          <span>{project_lead_name || "Unassigned"}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCheckCircle size={14} color="var(--color-success)" />
          <span>
            {completed_tasks}/{total_tasks} tasks
          </span>
        </div>
      </div>
    </div>
  );
}
