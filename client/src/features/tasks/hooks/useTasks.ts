import { useState, useEffect } from "react";
import { mockTasks } from "../../../mock/tasks";
import type { Task } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const newTasks = mockTasks.map((task) => ({ ...task }));
    setTasks([...newTasks]);
  }, []);

  const assignTask = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };

  const claimTask = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };

  const unclaimTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: null } : task
      )
    );
  };

  const addTask = (newTask: (typeof mockTasks)[0]) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: (typeof mockTasks)[0]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
    console.log(`Update task: ${taskId} with status: ${status} successful`);
  };

  return {
    tasks,
    assignTask,
    claimTask,
    unclaimTask,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
}
