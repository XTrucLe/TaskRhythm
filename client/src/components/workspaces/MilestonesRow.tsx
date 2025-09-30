import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";

type MilestoneProps = {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  order: number;
  status: "active" | "completed" | "upcoming";
  sections: {
    count: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
};

const MilestonesRow = ({ milestone }: { milestone: MilestoneProps }) => {
  const progress =
    milestone.sections.count > 0
      ? (milestone.sections.completed / milestone.sections.count) * 100
      : 0;

  const statusConfig = {
    completed: {
      label: "Completed",
      color: "text-green-700 bg-green-100",
      icon: <AiOutlineCheckCircle className="w-4 h-4 text-green-600" />,
    },
    active: {
      label: "Active",
      color: "text-blue-700 bg-blue-100",
      icon: <AiOutlinePlayCircle className="w-4 h-4 text-blue-600" />,
    },
    upcoming: {
      label: "Upcoming",
      color: "text-gray-700 bg-gray-200",
      icon: <AiOutlineClockCircle className="w-4 h-4 text-gray-600" />,
    },
  }[milestone.status];

  return (
    <div className="p-5 border rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 flex-row-reverse">
        <span
          className={`flex h-8 min-w-24 justify-center items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusConfig.color} banned-select`}
        >
          {statusConfig.icon}
          {statusConfig.label}
        </span>
        <div>
          <h3 className="text-lg font-semibold title-color mb-2">
            {milestone.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 indent-2 min-h-11">
            {milestone.description}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Start: {new Date(milestone.startDate).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>
            {milestone.sections.completed} / {milestone.sections.count}{" "}
            completed
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MilestonesRow;
