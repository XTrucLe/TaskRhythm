import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TaskColumn } from "../types/taskColumn";

interface TaskColumnState {
  columns: TaskColumn[];
  allColumns: TaskColumn[];
  defaultColumns: string[];
  setColumns: (columns: TaskColumn[]) => void;
}

export const allColumns: TaskColumn[] = [
  // Cơ bản
  { key: "name", label: "Name", width: 320 },
  { key: "description", label: "Description", width: 180 },
  { key: "type", label: "Type", width: 100 },
  { key: "priority", label: "Priority", width: 80 },

  // Phân công
  { key: "assignee", label: "Assignee", width: 180 },

  // Thời gian
  { key: "startDate", label: "Start Date", width: 100 },
  { key: "actualStartDate", label: "Start Actual", width: 100 },
  { key: "dueDate", label: "Due Date", width: 100 },
  { key: "completedDate", label: "Completed At", width: 100 },

  // Tiến độ & trạng thái
  { key: "progress", label: "Progress", width: 80 },
  { key: "status", label: "Status", width: 100 },

  // ⏱Thời lượng
  { key: "estimatedHours", label: "Estimated Hours", width: 100 },
  { key: "loggedHours", label: "Hours Actual", width: 100 },
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
      (set) => ({
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
        setColumns: (columns: TaskColumn[]) => set({ columns }),
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
