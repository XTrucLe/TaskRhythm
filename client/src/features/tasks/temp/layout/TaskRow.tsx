import React, { Fragment } from "react";
import { TableRow } from "@mui/material";
import CellFactory from "../cells";
import type { TaskColumn } from "../../types/taskColumn";
import type { Task } from "../../types/task";
import NewRow from "./NewRow";

type TableRowProps = {
  columns: TaskColumn[];
  task: Task;
  level?: number;
  expanded?: string[];
  toggleExpanded?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
  onAddSubTask?: (parentId: string, level: number) => void;
  addingRow?: { parentId: string; level: number } | null;
  onSaveRow?: (newTask: Omit<Task, "id">) => void;
  onCancelRow?: () => void;
  openDetail?: (taskId: string) => void;
};

function TaskRow({
  columns,
  task,
  level = 0,
  expanded = [],
  toggleExpanded,
  onAddSubTask,
  addingRow,
  onSaveRow,
  onCancelRow,
  openDetail,
}: TableRowProps) {
  const isExpanded = expanded.includes(task.id);

  const handleClick = (columnKey: string) => {
    if (columnKey === "name") openDetail?.(task.id);
  };

  return (
    <Fragment>
      <TableRow
        sx={{ fontSize: "0.875rem", "& input": { fontSize: "0.875rem" } }}
      >
        {columns.map((col) => (
          <CellFactory
            key={col.key}
            task={task}
            columnKey={col.key}
            editing
            onChange={() => {}}
            expanded={isExpanded}
            toggleExpanded={() => toggleExpanded?.(task.id)}
            onAddSubTask={onAddSubTask}
            onClick={() => handleClick(col.key)}
          />
        ))}
      </TableRow>

      {/* Render sub-tasks recursively */}
      {isExpanded &&
        task.subTasks?.map((sub) => (
          <TaskRow
            key={sub.id}
            columns={columns}
            task={sub}
            level={level + 1}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
            onAddSubTask={onAddSubTask}
            addingRow={addingRow}
            onSaveRow={onSaveRow}
            onCancelRow={onCancelRow}
            openDetail={openDetail}
          />
        ))}

      {/* Temporary row for new sub-task */}
      {addingRow?.parentId === task.id && onSaveRow && onCancelRow && (
        <NewRow
          task={{
            name: "",
            status: "coming_soon",
            priority: "low",
            level: addingRow.level,
            type: "task",
            parentId: addingRow.parentId,
          }}
          onSave={onSaveRow}
          onCancel={onCancelRow}
        />
      )}
    </Fragment>
  );
}

export default React.memo(TaskRow);
