import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { Task } from "../../../types/task";
import { Fragment } from "react/jsx-runtime";
import { StatusCell, StatusDropdown } from "../../task/TaskStatus";
import {
  FiPlusCircle as Add,
  FiEdit as Edit,
  FiTrash as Delete,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

type TaskTableProps = {
  data?: Task[];
  expanded?: string[];
  setExpanded?: React.Dispatch<React.SetStateAction<string[]>>;
};

const ToolBox = ({
  hide,
  onAdd,
  onEdit,
  onDelete,
}: {
  hide?: ("add" | "edit" | "delete")[];
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) => (
  <Box
    className="table-toolbox"
    sx={{
      display: "none",
      flexDirection: "row",
      width: "fit-content",
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      transition: "opacity 0.2s ease",
    }}
  >
    {!hide?.includes("add") && (
      <Tooltip title="Add" arrow>
        <IconButton size="small" onClick={onAdd}>
          <Add size={16} />
        </IconButton>
      </Tooltip>
    )}

    {!hide?.includes("edit") && (
      <Tooltip title="Edit" arrow>
        <IconButton size="small" onClick={onEdit}>
          <Edit size={16} />
        </IconButton>
      </Tooltip>
    )}
    {!hide?.includes("delete") && (
      <Tooltip title="Delete" arrow>
        <IconButton size="small" onClick={onDelete}>
          <Delete size={16} />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default function TaskTable({
  data,
  expanded = [],
  setExpanded,
}: TaskTableProps) {
  const cellRef = useRef<HTMLTableCellElement | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  // const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    if (editing && cellRef.current) {
      const el = cellRef.current;
      el.focus();

      // --- Di chuyển con trỏ ra sau cùng ---
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false); // false => sau cùng
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const toggleExpand = (id: string) => {
    if (!setExpanded) return;
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onchangeStatus = (id: string, status: string) => {
    // Handle status change logic here
    console.log(`Task ID: ${id}, New Status: ${status}`);
  };
  const isExpanded = (id: string): boolean => expanded.includes(id);

  const renderTaskRow = (task: Task, level = 0) => (
    <Fragment key={task.id}>
      <TableRow
        key={task.id}
        sx={{
          height: 36,
          "&:last-child td": { borderBottom: 0 },
        }}
      >
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
          onBlur={(e) => {
            // Save the edited name
            console.log(
              `Task ID: ${task.id}, New Name: ${e.currentTarget.textContent}`
            );
            setEditing(null);
          }}
        >
          {task.subTasks && task.subTasks.length > 0 && setExpanded && (
            <IconButton size="small" onClick={() => toggleExpand(task.id)}>
              {isExpanded(task.id) ? (
                <FaChevronDown size={11} />
              ) : (
                <FaChevronRight size={11} />
              )}
            </IconButton>
          )}
          <Typography
            variant="body1"
            ref={editing === task.id ? cellRef : null}
            contentEditable={editing === task.id ? true : false}
            suppressContentEditableWarning={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            sx={{
              outline: "none",
              display: " inline-block",
              alignItems: "center",
            }}
          >
            {task.name}
          </Typography>
          {editing !== task.id && (
            <ToolBox
              hide={task.level !== 2 ? [] : ["add"]}
              onEdit={() => setEditing(task.id)}
            />
          )}
        </TableCell>

        <TableCell>{task.assignee?.join(", ") || "-"}</TableCell>

        <TableCell>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("vi-VN")
            : "-"}
        </TableCell>
        <TableCell>
          {task.level == 2 ? (
            <StatusDropdown
              status={task.status}
              onchange={() => onchangeStatus(task.id, task.status)}
            />
          ) : (
            <StatusCell status={task.status} />
          )}
        </TableCell>
      </TableRow>

      {isExpanded(task.id) &&
        task.subTasks?.map((subtask) => renderTaskRow(subtask, level + 1))}
    </Fragment>
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "var(--shadow-md)",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "auto",
        mt: 1,
        "&::-webkit-scrollbar": {
          height: 6,
          margin: 2,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Table
        sx={{
          tableLayout: "fixed",
          minWidth: 700,
          "& .MuiTableCell-root": {
            padding: "4px 8px",
            fontSize: 14,
            textOverflow: "ellipsis",
          },
          "& .MuiTableRow-root": { transition: "background 0.2s" },
          "& .MuiTableRow-root:hover": { backgroundColor: "grey.50" },
        }}
        size="small"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                zIndex: 10,
                fontWeight: 600,
                width: 320,
                bgcolor: "inherit",
                pl: "16px !important",
              }}
            >
              Task
            </TableCell>
            <TableCell sx={{ fontWeight: 600, width: 148 }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 600, width: 148 }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 600, width: 148 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((t) => renderTaskRow(t))}
          <TableRow
            key="additional-row"
            sx={{
              height: 36,
              "&:last-child td": { borderBottom: 0 },
            }}
          >
            <TableCell
              sx={{
                position: "sticky",
                zIndex: 10,
                left: 5,
                fontSize: 14,
                color: "gray",
                backgroundColor: "background.paper",
              }}
            >
              + Add new task
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
