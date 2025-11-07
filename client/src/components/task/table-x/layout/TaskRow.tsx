import React, { Fragment } from "react";
import { TableRow } from "@mui/material";
import CellFactory from "../cells";
import type { ColumnDef } from "../types/columns";
import type { Task } from "../../../../types/task";
import NewRow from "./NewRow";

type TableRowProps = {
  columns: ColumnDef[];
  task: Task;
  level?: number;
  expanded?: string[];
  setExpanded?: (expanded: string[]) => void;
  onStatusChange?: (id: string, status: string) => void;
  onAddSubTask?: (parentId: string, level: number) => void;
  addingRow?: {
    parentId: string;
    level: number;
  } | null;
  onSaveRow?: (newTask: Omit<Task, "id">) => void;
  onCancelRow?: () => void;
};

function TaskRow({
  columns,
  task,
  level,
  expanded,
  setExpanded,
  onStatusChange,
  onAddSubTask,
  addingRow,
  onSaveRow,
  onCancelRow,
}: TableRowProps) {
  const toggleExpanded = () => {
    if (!setExpanded) return;
    if (expanded?.includes(task.id)) {
      setExpanded(expanded.filter((id) => id !== task.id));
    } else {
      setExpanded([...(expanded || []), task.id]);
    }
  };

  const isExpanded = expanded?.includes(task.id) || false;

  return (
    <Fragment>
      <TableRow onClick={() => {}}>
        {columns.map((column) => (
          <CellFactory
            key={column.key}
            task={task}
            columnKey={column.key}
            editing={true}
            onChange={() => {}}
            expanded={isExpanded}
            toggleExpanded={toggleExpanded}
            onAddSubTask={onAddSubTask}
          />
        ))}
      </TableRow>

      {/* Render sub-tasks recursively */}
      {isExpanded &&
        task.subTasks?.map((subtask) => (
          <TaskRow
            key={subtask.id}
            columns={columns}
            task={subtask}
            level={(level || 0) + 1}
            expanded={expanded}
            setExpanded={setExpanded}
            onStatusChange={onStatusChange}
            onAddSubTask={onAddSubTask}
            addingRow={addingRow}
            onSaveRow={onSaveRow}
            onCancelRow={onCancelRow}
          />
        ))}

      {/* Render temporary row for new sub-task */}
      {addingRow &&
        onSaveRow &&
        onCancelRow &&
        addingRow.parentId === task.id && (
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
