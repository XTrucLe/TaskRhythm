import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TaskColumn } from "../types/taskColumn";

interface TaskColumnState {
  columns: TaskColumn[];
  allColumns: TaskColumn[];
  defaultColumns: string[];
  addColumns: (key: string) => void;
  removeColumns: (key: string) => void;
}

export const allColumns: TaskColumn[] = [
  // Cơ bản
  { key: "name", label: "Name", width: 320 },
  { key: "description", label: "Description", width: 180 },
  { key: "type", label: "Type", width: 100 },
  { key: "priority", label: "Priority", width: 120 },

  // Phân công
  { key: "assignee", label: "Assignee", width: 180 },

  // Thời gian
  { key: "startDate", label: "Start Date", width: 120 },
  { key: "actualStartDate", label: "Start Actual", width: 120 },
  { key: "dueDate", label: "Due Date", width: 120 },
  { key: "completedDate", label: "Completed", width: 120 },

  // Tiến độ & trạng thái
  { key: "progress", label: "Progress", width: 80 },
  { key: "status", label: "Status", width: 100 },

  // ⏱Thời lượng
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

export const useTaskColumnStore = create<TaskColumnState>()(
  devtools(
    persist(
      (set, get) => ({
        columns: defaultColumns
          .map((key) => allColumns.find((col) => col.key === key))
          .filter(Boolean) as TaskColumn[],
        allColumns: allColumns,
        defaultColumns: [
          "name",
          "assignee",
          "status",
          "priority",
          "dueDate",
          "progress",
        ],
        addColumns: (key: string) =>
          set({
            columns: [
              ...get().columns,
              allColumns.find((col) => col.key === key) as TaskColumn,
            ],
          }),
        removeColumns: (key: string) =>
          set({
            columns: get().columns.filter((col) => col.key !== key),
          }),

        reset: () =>
          set({
            columns: [],
          }),
      }),
      {
        name: "task-column-storage",
      }
    )
  )
);
