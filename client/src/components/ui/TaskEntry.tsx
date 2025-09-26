import { daysLeft } from "../../utils/date.helper";

type TaskEntryProps = {
  task: string;
  workspace: string;
  milestone: string;
  dueDate: Date;
  priority: 1 | 2 | 3;
  status: "todo" | "in-progress" | "done";
};

export default function TaskEntry({ item }: { item: TaskEntryProps }) {
  const days = daysLeft(item.dueDate);

  const deadlineText =
    days > 1
      ? `${days} days left`
      : days === 1
      ? "1 day left"
      : days === 0
      ? "Due today"
      : "Overdue";

  const priorityStyles: Record<1 | 2 | 3, string> = {
    1: "bg-green-100 text-green-700",
    2: "bg-yellow-100 text-yellow-700",
    3: "bg-red-100 text-red-700",
  };

  const statusStyles: Record<TaskEntryProps["status"], string> = {
    todo: "bg-gray-200 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-green-200 text-green-800",
  };

  return (
    <div className="border-l-4 border-[var(--color-info-border)] rounded-lg shadow-md hover:shadow-lg transition bg-info p-4 sm:p-5 mb-4 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-primary truncate">
            {item.task}
          </h3>
          <p className="text-sm text-primary">
            Workspace: <span className="font-medium">{item.workspace}</span>
          </p>
          <p className="text-sm text-primary">
            Milestone: <span className="font-medium">{item.milestone}</span>
          </p>
        </div>

        {/* Priority Badge */}
        <span
          className={`self-start sm:self-center px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
            priorityStyles[item.priority]
          }`}
        >
          Priority {item.priority}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusStyles[item.status]
          }`}
        >
          {item.status}
        </span>

        <span
          className={`text-sm font-medium ${
            days < 0 ? "text-red-600" : "text-primary"
          }`}
        >
          {deadlineText}
        </span>
      </div>
    </div>
  );
}
