import type { Task, TaskStatus } from "./task";

export type TaskColumn = {
  key: keyof Omit<Task, "id" | "subTasks" | "parentId" | "level">;
  label: string;
  width?: number;
};

export type StatusColumn = {
  key: TaskStatus;
  label: string;
  width?: number;
  options: string[];
};
