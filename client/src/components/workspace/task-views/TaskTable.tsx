import { useContext, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  FiPlus as Add,
  FiChevronRight as Expand,
  FiChevronDown as Collapse,
} from "react-icons/fi";
import { mockTasks } from "../../../mock/tasks";
import type { Task } from "../../../types/task";
import { TaskContext } from "../../../contexts/TaskContext";
import TaskDrawer from "../TaskDrawer";

export default function TaskTableView({
  expanded,
  setExpanded,
}: {
  expanded: number[];
  setExpanded: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { tasks, updateTaskStatus: handleStatusChange } =
    useContext(TaskContext);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onRowClick = (task: Task, e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("#expand-icon")) return;

    setSelectedTask(task);
    setIsOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const visibleTasks = useMemo(() => {
    const result: Task[] = [];

    const addVisible = (task: Task) => {
      result.push(task);
      if (expanded.includes(task.id)) {
        tasks.filter((child) => child.parentId === task.id).forEach(addVisible);
      }
    };

    tasks.filter((t) => !t.parentId).forEach(addVisible);
    return result;
  }, [expanded, tasks]);

  const canChangeTask = (task: Task, currentUser: string) =>
    task.assignee === currentUser;

  const columns = useMemo<GridColDef<Task>[]>(
    () => [
      {
        field: "name",
        headerName: "Task Name",
        flex: 1.5,
        minWidth: 180,
        renderCell: ({ row }) => {
          const hasChildren = mockTasks.some((t) => t.parentId === row.id);
          const isExpanded = expanded.includes(row.id);
          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ pl: `${(row.level || 0) * 2}rem` }}>
                {hasChildren && (
                  <IconButton
                    size="small"
                    id="expand-icon"
                    onClick={() =>
                      setExpanded((prev) => {
                        if (prev.includes(row.id)) {
                          return prev.filter((id) => id !== row.id);
                        }
                        return [...prev, row.id];
                      })
                    }
                    sx={{ mr: 0.5 }}
                  >
                    {isExpanded ? <Collapse size={14} /> : <Expand size={14} />}
                  </IconButton>
                )}
              </Box>
              <Typography fontWeight={500}>{row.name}</Typography>
            </Stack>
          );
        },
      },
      {
        field: "assignee",
        headerName: "Assignee",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }) => (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{
                width: 26,
                height: 26,
                fontSize: 12,
                bgcolor: "#2563eb20",
                color: "#2563eb",
              }}
            >
              {row.assignee[0]}
            </Avatar>
            <Typography>{row.assignee}</Typography>
          </Stack>
        ),
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 120,
        sortComparator: (v1, v2) => {
          const order: Record<string, number> = { high: 3, medium: 2, low: 1 };
          return order[v1] - order[v2];
        },
        renderCell: ({ row }) => {
          const color =
            row.priority === "high"
              ? "error"
              : row.priority === "medium"
              ? "warning"
              : "success";
          return (
            <Chip
              size="small"
              clickable={canChangeTask(row, "An")}
              label={
                row.priority.charAt(0).toUpperCase() +
                row.priority.slice(1).replace("_", " ")
              }
              color={color}
              variant="outlined"
            />
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        resizable: false,
        renderCell: ({ row }) => {
          const isLeaf = !mockTasks.some((t) => t.parentId === row.id);

          const statusConfig = {
            todo: { label: "Todo", color: "warning" },
            in_progress: { label: "In Progress", color: "default" },
            done: { label: "Done", color: "success" },
          };

          const { label, color } = statusConfig[
            row.status as keyof typeof statusConfig
          ] || {
            label: "Unknown",
            color: "warning",
          };

          if (!isLeaf) {
            return (
              <Chip
                size="small"
                label={label}
                color={color as keyof typeof Chip}
                sx={{
                  fontWeight: 500,
                  alignItems: "center",
                  width: 80,
                  height: 32,
                  fontSize: 14,
                }}
              />
            );
          }

          return (
            <Select
              size="small"
              variant="standard"
              value={row.status}
              onChange={(e) => handleStatusChange(row.id, e.target.value)}
              sx={{
                fontWeight: 500,
                width: "100%",
                maxWidth: 160,
                "& .MuiSelect-select": {
                  pr: "0 !important",
                },
                "&::before": { borderBottom: "none" },
                "&:hover::before": { borderBottom: "none !important" },
                "&::after": { borderBottom: "none" },
                "& .MuiSelect-icon": {
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                },
              }}
            >
              {Object.entries(statusConfig).map(([key, { label, color }]) => (
                <MenuItem key={key} value={key}>
                  <Chip
                    label={label}
                    color={color as keyof typeof Chip}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      alignItems: "center",
                      width: 80,
                      height: 32,
                      fontSize: 14,
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          );
        },
      },
      {
        field: "progress",
        headerName: "Progress",
        width: 130,
        renderCell: () => {
          const progress = Math.floor(Math.random() * 101);
          return <Typography variant="body2">{progress}%</Typography>;
        },
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        width: 120,
        renderCell: ({ row }) => (
          <Typography variant="body2">{row.dueDate}</Typography>
        ),
      },
      {
        field: "updatedAt",
        headerName: "Last Updated",
        width: 160,
      },
    ],
    [expanded, setExpanded, handleStatusChange]
  );

  return (
    <Paper
      sx={{
        height: "calc(100vh - 52px)",
        p: 4,
        overflow: "hidden",
        margin: "auto",
        width: "100%",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Task Hierarchy
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          disableElevation
          sx={{ textTransform: "none" }}
        >
          New Task
        </Button>
      </Box>

      <DataGrid
        rows={visibleTasks}
        columns={columns}
        getRowId={(r) => r.id}
        disableRowSelectionOnClick
        filterMode="client"
        hideFooterPagination
        showCellVerticalBorder
        showColumnVerticalBorder
        rowHeight={48}
        onRowClick={(taskRow, e) => onRowClick(taskRow.row as Task, e)}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1f5f9",
            alignItems: "center",
            display: "flex",
          },
        }}
      />
      <TaskDrawer
        task={selectedTask}
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
      />
    </Paper>
  );
}
