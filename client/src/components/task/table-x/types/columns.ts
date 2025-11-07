import type { Task } from "../../../../types/task";

export type ColumnDef = {
  key: keyof Omit<Task, "id" | "subTasks" | "parentId" | "level">;
  label: string;
  width?: number;
};

export const defaultColumns: ColumnDef[] = [
  { key: "name", label: "Name", width: 320 },
  { key: "assignee", label: "Assignee", width: 200 },
  { key: "status", label: "Status", width: 150 },
  { key: "priority", label: "Priority", width: 150 },
  { key: "dueDate", label: "Due Date", width: 150 },
  { key: "progress", label: "Progress", width: 120 },
];
