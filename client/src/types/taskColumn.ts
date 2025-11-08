import type { Task } from "./task";

export type TaskColumn = {
  key: keyof Omit<Task, "id" | "subTasks" | "parentId" | "level">;
  label: string;
  width?: number;
};
