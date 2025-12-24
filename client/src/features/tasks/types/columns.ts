import type { TaskColumn } from "./taskColumn";

export const allColumns: TaskColumn[] = [
  // Cơ bản
  { key: "name", label: "Name", width: 320 },
  { key: "description", label: "Description", width: 180 },
  { key: "type", label: "Type", width: 100 },
  { key: "priority", label: "Priority", width: 80 },

  // Phân công
  { key: "assignee", label: "Assignee", width: 180 },

  // Thời gian
  { key: "startDate", label: "Start Date", width: 100 },
  { key: "actualStartDate", label: "Start Actual", width: 100 },
  { key: "dueDate", label: "Due Date", width: 100 },
  { key: "completedDate", label: "Completed At", width: 100 },

  // Tiến độ & trạng thái
  { key: "progress", label: "Progress", width: 80 },
  { key: "status", label: "Status", width: 100 },

  // ⏱Thời lượng
  { key: "estimatedHours", label: "Estimated Hours", width: 100 },
  { key: "loggedHours", label: "Hours Actual", width: 100 },
];

export const defaultColumns: TaskColumn[] = allColumns.filter((col) =>
  ["name", "assignee", "status", "priority", "dueDate", "progress"].includes(
    col.key
  )
);
