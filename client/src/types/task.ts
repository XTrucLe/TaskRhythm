export interface Task {
  id: number;
  name: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  updatedAt: string;
  parentId?: number | null;
  level?: number;
}

export type TaskStatus =
  | "coming_soon"
  | "todo"
  | "doing"
  | "done"
  | "overdue"
  | "done_late"
  | "cancelled";

export type TaskPriority = "low" | "medium" | "high";
