export interface Task {
  id: string;
  name: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;
  progress?: number;

  parentId?: string | null;
  type: TaskType;
  level?: number;
  subTasks?: Task[];

  assignee: string[];

  startDate?: Date;
  dueDate?: Date;
  actualStartDate?: Date;
  completedDate?: Date;

  estimatedHours?: number;
  loggedHours?: number;
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

export type TaskType = "phase" | "milestone" | "task";
