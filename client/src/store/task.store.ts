import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Task, TaskFilter, TaskStatus } from "../types/task";
import { AllUsers } from "../mock/tasks";
import type { UserBase } from "../types/user";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;

  selectedTask: Task | null;
  setSelectedTask: (taskId: string | null) => void;

  expanded: string[];
  toggleExpanded: (id: string) => void;
  isExpanded: (id: string) => boolean;

  permission?: Record<string, boolean>;
  setPermission: (permission: Record<string, boolean>) => void;

  filter?: TaskFilter[];
  setFilter: (filter: TaskFilter[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface TaskActions {
  addTask: (task: Task) => void;
  addSubTask: (parentId: string, task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: Partial<Omit<Task, "id">>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;

  assignTask: (taskId: string, userId: string) => void;
  unassignTask: (taskId: string) => void;

  claimTask: (taskId: string, userId: string) => void;
  unclaimTask: (taskId: string) => void;
}

interface TaskStore extends TaskState, TaskActions {}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        setTasks: (tasks: Task[]) => set({ tasks }),

        selectedTask: null,
        setSelectedTask: (taskId: string | null) =>
          set({
            selectedTask: taskId
              ? (function f(ts: Task[]): Task | undefined {
                  for (const t of ts) if (t.id === taskId) return t;
                  for (const t of ts)
                    if (t.subTasks) {
                      const r = f(t.subTasks);
                      if (r) return r;
                    }
                })(get().tasks) ?? null
              : null,
          }),

        expanded: [],
        toggleExpanded: (id: string) =>
          set((state) => ({
            expanded: state.expanded.includes(id)
              ? state.expanded.filter((item) => item !== id)
              : [...state.expanded, id],
          })),
        isExpanded: (id: string) => get().expanded.includes(id),

        permission: undefined,
        setPermission: (permission: Record<string, boolean>) =>
          set({ permission }),

        filter: undefined,
        setFilter: (filter: TaskFilter[]) => set({ filter }),

        loading: false,
        setLoading: (loading: boolean) => set({ loading }),

        addTask: (task: Task) =>
          set((state) => ({ tasks: [...state.tasks, task] })),

        addSubTask: (parentId: string, task: Task) =>
          set((state) => {
            const addSubTaskRecursively = (tasks: Task[]): Task[] => {
              return tasks.map((t) => {
                if (t.id === parentId) {
                  return {
                    ...t,
                    subTasks: [...(t.subTasks || []), task],
                  };
                } else if (t.subTasks && t.subTasks.length > 0) {
                  return {
                    ...t,
                    subTasks: addSubTaskRecursively(t.subTasks),
                  };
                }
                return t;
              });
            };

            return {
              tasks: addSubTaskRecursively(state.tasks),
            };
          }),

        removeTask: (taskId: string) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          })),

        updateTask: (taskId: string, updatedTask: Partial<Omit<Task, "id">>) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updatedTask } : task
            ),
          })),

        updateTaskStatus: (taskId: string, status: TaskStatus) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, status } : task
            ),
          })),

        assignTask: (taskId: string, userId: string) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    assignee: [
                      ...(task.assignee || []),
                      AllUsers.find((user) => user.id === userId) as UserBase,
                    ],
                  }
                : task
            ),
          })),

        unassignTask: (taskId: string) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, assignee: [] } : task
            ),
          })),

        claimTask: (taskId: string, userId: string) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    assignee: [
                      ...(task.assignee || []),
                      AllUsers.find((user) => user.id === userId) as UserBase,
                    ],
                  }
                : task
            ),
          })),
        unclaimTask: (taskId: string) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, assignee: [] } : task
            ),
          })),
      }),
      {
        name: "task-storage",
      }
    )
  )
);
