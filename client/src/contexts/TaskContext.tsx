import { createContext, useContext } from "react";
import { type Task } from "./../types/task";

interface TaskContextProps {
  tasks: Task[];
  permissions: Record<string, boolean>;

  // Function
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  assignTask: (taskId: string, userId: string) => void;
  claimTask: (taskId: string, userId: string) => void;
  unclaimTask: (taskId: string) => void;

  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

const emptyFn = () => {};

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  permissions: {},

  addTask: emptyFn,
  updateTask: emptyFn,
  deleteTask: emptyFn,
  assignTask: emptyFn,
  claimTask: emptyFn,
  unclaimTask: emptyFn,
  updateTaskStatus: emptyFn,
});

export const useTaskContext = () => useContext(TaskContext);
