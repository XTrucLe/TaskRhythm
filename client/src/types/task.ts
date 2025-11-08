import type { UserBase } from "./user";

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

  assignee?: UserBase[];

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

export type TaskColumnsDef = Omit<
  Task,
  "id" | "subTasks" | "parentId" | "level"
>;

export const TaskFieldKeys: (keyof TaskColumnsDef)[] = [
  "name",
  "description",
  "status",
  "priority",
  "progress",
  "type",
  "assignee",
  "startDate",
  "dueDate",
  "actualStartDate",
  "completedDate",
  "estimatedHours",
  "loggedHours",
];

export type Operation =
  | "contains"
  | "does not contain"
  | "equals"
  | "does not equal"
  | "starts with"
  | "does not start with"
  | "ends with"
  | "does not end with";


export type TaskFilter = {
  field: keyof TaskColumnsDef;
  operation: Operation;
  value: string;
}