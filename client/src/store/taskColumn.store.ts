import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TaskColumn } from "../types/taskColumn";

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

const defaultColumns = [
  "name",
  "assignee",
  "status",
  "priority",
  "dueDate",
  "progress",
];

const pickColumns = (keys: string[]) =>
  allColumns.filter((c) => keys.includes(c.key));

export const useTaskColumnStore = create<TaskColumnState>()(
  devtools(
    persist(
      (set, get) => ({
        columns: pickColumns(defaultColumns),
        allColumns,
        defaultColumns,
        addColumns: (key: string) =>
          set(() => {
            const { columns } = get();
            const col = allColumns.find((c) => c.key === key);
            if (!col) return { columns };
            const merged = [...columns.filter((c) => c.key !== key), col];
            const sorted = allColumns.filter((c) =>
              merged.some((m) => m.key === c.key)
            );
            return { columns: sorted };
          }),
        removeColumns: (key: string) =>
          set({
            columns: get().columns.filter((c) => c.key !== key),
          }),
        reset: () => set({ columns: pickColumns(defaultColumns) }),
      }),
      { name: "task-column-storage" }
    )
  )
);

interface TaskColumnState {
  columns: TaskColumn[];
  allColumns: TaskColumn[];
  defaultColumns: string[];
  addColumns: (key: string) => void;
  removeColumns: (key: string) => void;
  reset: () => void;
}
