import { createContext, useContext } from "react";
import { type Task } from "./../types/task";

interface TaskContextProps {
  tasks: Task[];
  permissions: Record<string, boolean>;

  // Function
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  assignTask: (taskId: number, userId: number) => void;
  claimTask: (taskId: number, userId: number) => void;
  unclaimTask: (taskId: number) => void;

  updateTaskStatus: (taskId: number, status: Task["status"]) => void;
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
