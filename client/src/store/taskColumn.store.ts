import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StatusColumn, TaskColumn } from "../types/taskColumn";

export const allColumns: TaskColumn[] = [
  { key: "name", label: "Name", width: 320 },
  { key: "status", label: "Status", width: 100 },
  { key: "priority", label: "Priority", width: 120 },
  { key: "progress", label: "Progress", width: 100 },
  { key: "assignee", label: "Assignee", width: 180 },
  { key: "dueDate", label: "Due Date", width: 130 },
  { key: "startDate", label: "Start Date", width: 130 },
  { key: "description", label: "Description", width: 180 },
  { key: "type", label: "Type", width: 100 },
  { key: "actualStartDate", label: "Start Actual", width: 130 },
  { key: "completedDate", label: "Completed", width: 130 },
  { key: "estimatedHours", label: "Estimated", width: 120 },
  { key: "loggedHours", label: "Hours Actual", width: 120 },
];

export const defaultColumns = [
  "name",
  "assignee",
  "status",
  "priority",
  "dueDate",
  "progress",
];

export const allStatusColumns: StatusColumn[] = [
  { key: "coming_soon", label: "Not Started", options: [] },
  { key: "todo", label: "To Do", options: [] },
  { key: "doing", label: "In Progress", options: [] },
  { key: "done", label: "Completed", options: [] },
  { key: "overdue", label: "Overdue", options: [] },
  { key: "done_late", label: "Done Late", options: [] },
  { key: "cancelled", label: "Cancelled", options: [] },
];

export const defaultStatusColumns: StatusColumn[] = [
  { key: "todo", label: "To Do", options: [] },
  { key: "doing", label: "In Progress", options: [] },
  { key: "done", label: "Completed", options: [] },
];

const pickColumns = <T extends { key: string }>(all: T[], keys: string[]) =>
  all.filter((c) => keys.includes(c.key));

const mergeAndSort = <T extends { key: string }>(
  all: T[],
  current: T[],
  key: string
) => {
  const col = all.find((c) => c.key === key);
  if (!col) return current;
  const merged = [...current.filter((c) => c.key !== key), col];
  return all.filter((c) => merged.some((m) => m.key === c.key));
};

interface TaskColumnState {
  columns: TaskColumn[];
  allColumns: TaskColumn[];
  defaultColumns: string[];
  addColumns: (key: string) => void;
  removeColumns: (key: string) => void;
  reset: () => void;

  statusColumns: StatusColumn[];
  allStatusColumns: StatusColumn[];
  defaultStatusColumns: StatusColumn[];
  addStatusColumns: (key: string) => void;
  removeStatusColumns: (key: string) => void;
  resetStatus: () => void;
}

export const useTaskColumnStore = create<TaskColumnState>()(
  devtools(
    persist(
      (set, get) => ({
        columns: pickColumns(allColumns, defaultColumns),
        allColumns,
        defaultColumns,
        addColumns: (key) =>
          set(() => ({
            columns: mergeAndSort(allColumns, get().columns, key),
          })),
        removeColumns: (key) =>
          set(() => ({ columns: get().columns.filter((c) => c.key !== key) })),
        reset: () =>
          set(() => ({ columns: pickColumns(allColumns, defaultColumns) })),

        statusColumns: defaultStatusColumns,
        allStatusColumns,
        defaultStatusColumns,
        addStatusColumns: (key) =>
          set(() => ({
            statusColumns: mergeAndSort(
              allStatusColumns,
              get().statusColumns,
              key
            ),
          })),
        removeStatusColumns: (key) =>
          set(() => ({
            statusColumns: get().statusColumns.filter((c) => c.key !== key),
          })),
        resetStatus: () => set(() => ({ statusColumns: defaultStatusColumns })),
      }),
      { name: "task-column-storage" }
    )
  )
);
