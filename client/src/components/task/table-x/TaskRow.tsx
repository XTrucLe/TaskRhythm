import React, { Fragment } from "react";
import { TableRow } from "@mui/material";
import CellFactory from "./cells";
import type { ColumnDef } from "./ColumnDef";
import type { Task } from "../../../types/task";

type TableRowProps = {
  columns: ColumnDef[];
  task: Task;
  level?: number;
  expanded?: string[];
  setExpanded?: (expanded: string[]) => void;
  onStatusChange?: (id: string, status: string) => void;
};

function TaskRow({
  columns,
  task,
  level,
  expanded,
  setExpanded,
  onStatusChange,
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
      <TableRow
        sx={{
          "& .MuiTableCell-root": {
            padding: "6px 12px !important",
            height: "32px !important",
            lineHeight: "1.25rem",
            verticalAlign: "middle",
          },
        }}
        onClick={() => {}}
      >
        {columns.map((column) => (
          <CellFactory
            key={column.key}
            task={task}
            columnKey={column.key}
            editing={true}
            onChange={() => {}}
            expanded={isExpanded}
            toggleExpanded={toggleExpanded}
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
          />
        ))}
      {/* Render temporary row for new sub-task */}
    </Fragment>
  );
}

export default React.memo(TaskRow);
