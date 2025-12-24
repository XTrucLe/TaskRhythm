import { useEffect, useRef } from "react";
import type { Task } from "../../types/task";
import { IconButton, TableCell, Typography } from "@mui/material";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import TaskTableToolbox from "./TaskTableToolbox";

type TaskTableNameCellProps = {
  task: Task;
  level: number;
  isExpanded: boolean;
  isEditing: boolean;
  onToggleExpand?: () => void;
  onEdit?: () => void;
  onAddSubTask?: () => void;
  onSave: (taskId: string, newName: string) => void;
};

export default function TaskTableNameCell({
  task,
  level,
  isExpanded,
  isEditing,
  onToggleExpand,
  onEdit,
  onAddSubTask,
  onSave,
}: TaskTableNameCellProps) {
  const cellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isEditing && cellRef.current) {
      const el = cellRef.current;
      el.focus();
      // Move cursor to the end
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const hasChildren = task.subTasks && task.subTasks.length > 0;

  return (
    <TableCell
      sx={{
        position: "sticky",
        zIndex: 10,
        left: 0,
        backgroundColor: "background.paper",
        paddingLeft: `${level * 2 + 0.3}rem !important`,
        outline: "none",
        "&:hover .table-toolbox": {
          display: "flex",
        },
      }}
    >
      {hasChildren && onToggleExpand && (
        <IconButton size="small" onClick={onToggleExpand}>
          {isExpanded ? (
            <FaChevronDown size={11} />
          ) : (
            <FaChevronRight size={11} />
          )}
        </IconButton>
      )}
      <Typography
        variant="body1"
        ref={cellRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={(e) => onSave(task.id, e.currentTarget.textContent || "")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        sx={{ outline: "none", display: "inline-block", alignItems: "center" }}
      >
        {task.name}
      </Typography>
      {!isEditing && (
        <TaskTableToolbox
          hide={task.level === 2 ? ["add"] : []}
          onEdit={onEdit}
          onAdd={onAddSubTask}
        />
      )}
    </TableCell>
  );
}
