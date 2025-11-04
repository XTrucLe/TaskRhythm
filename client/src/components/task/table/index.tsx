import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { Task } from "../../../types/task";
import { useState } from "react";
import TaskTableRow from "./TaskTableRow";
import { FiPlusCircle } from "react-icons/fi";
import AddColumn from "./AddColumn";

type ColumnKeys = keyof Omit<Task, "id" | "subTasks" | "parentId" | "level">;

type TaskTableProps = {
  data?: Task[];
  expanded?: string[];
  setExpanded?: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TaskTable({
  data,
  expanded = [],
  setExpanded,
}: TaskTableProps) {
  const [columns, setColumns] = useState<ColumnKeys[]>([
    "name",
    "assignee",
    "dueDate",
    "status",
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenAddColumn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddColumn = () => {
    setAnchorEl(null);
  };

  const toggleExpand = (id: string) => {
    if (!setExpanded) return;
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onStatusChange = (id: string, status: string) => {
    // Handle status change logic here
    console.log(`Task ID: ${id}, New Status: ${status}`);
  };

  const handleAddColumn = (newColumn: ColumnKeys) => {
    setColumns([...columns, newColumn]);
  };

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
        }}
        size="small"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell
              key="Task"
              sx={{
                position: "sticky",
                left: 0,
                zIndex: 10,
                minWidth: 320,
                fontWeight: 600,
                width: 320,
                bgcolor: "inherit",
                pl: "16px !important",
              }}
            >
              Name
            </TableCell>
            {columns.slice(1).map((column) => (
              <TableCell key={column} sx={{ fontWeight: 600, width: 148 }}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </TableCell>
            ))}
            <TableCell
              key="add-column"
              sx={{
                position: "sticky",
                zIndex: 10,
                right: 5,
                fontSize: 14,
                fontWeight: 600,
                width: 28,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: "inherit",
              }}
              onClick={handleOpenAddColumn}
            >
              <FiPlusCircle />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onStatusChange={onStatusChange}
            />
          ))}
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
      <AddColumn
        anchorEl={anchorEl}
        onClose={handleCloseAddColumn}
        onChange={(newColumn) => {
          handleAddColumn(newColumn);
          handleCloseAddColumn();
        }}
      />
    </TableContainer>
  );
}
