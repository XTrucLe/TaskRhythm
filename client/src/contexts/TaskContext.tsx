import { createContext, useContext } from "react";
import { type Task } from "./../types/task";

interface TaskContextProps {
  tasks: Task[];
  permissions: Record<string, boolean>;

  // Function
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  assignUser: (taskId: number, userId: number) => void;
  claimTask: (taskId: number, userId: number) => void;
  unclaimTask: (taskId: number) => void;
  updateTaskStatus: (taskId: number, status: Task["status"]) => void;
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  permissions: {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  assignUser: () => {},
  claimTask: () => {},
  unclaimTask: () => {},
  updateTaskStatus: () => {},
});
export const useTaskContext = () => useContext(TaskContext);
