import {
  Stack,
  Paper,
  Typography,
  Avatar,
  Chip,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "../../../types/task";
import {
  FiChevronDown as ExpandMore,
  FiChevronRight as ChevronRight,
  FiPlusCircle as Add,
  FiEdit as Edit,
  FiMoreHorizontal as More,
} from "react-icons/fi";
import { useTaskStore } from "../../../store/task.store";

// ------------------------
// Column definitions
// ------------------------
const ALL_COLUMNS = [
  { key: "coming_soon", label: "Coming Soon" },
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
  { key: "overdue", label: "Overdue" },
  { key: "done_late", label: "Done Late" },
  { key: "cancelled", label: "Cancelled" },
] as const;

interface FlatTaskNode extends Task {
  level: number;
  visible: boolean;
  collapsed?: boolean;
  parentId?: string;
  childrenIds: string[];
}

const flattenTasks = (tasks: Task[]): FlatTaskNode[] => {
  const map: Record<string, FlatTaskNode> = {};
  const roots: FlatTaskNode[] = [];

  tasks.forEach((t) => {
    map[t.id] = {
      ...t,
      parentId: t.parentId ?? undefined,
      level: 0,
      visible: true,
      collapsed: false,
      childrenIds: [],
    };
  });

  tasks.forEach((t) => {
    if (t.parentId && map[t.parentId]) {
      map[t.parentId].childrenIds.push(t.id);
    } else {
      roots.push(map[t.id]);
    }
  });

  const result: FlatTaskNode[] = [];
  const addTask = (task: FlatTaskNode, level: number) => {
    task.level = level;
    result.push(task);
    task.childrenIds.forEach((cid) => addTask(map[cid], level + 1));
  };

  roots.forEach((r) => addTask(r, 0));
  return result;
};

// ------------------------
// TaskCard component
// ------------------------
const TaskCard = ({
  task,
  toggleCollapse,
}: {
  task: FlatTaskNode;
  toggleCollapse: (id: string) => void;
}) => {
  if (!task.visible) return null;

  const hasChildren = task.childrenIds.length > 0;

  const levelOffset = -task.level * 0.5;

  return (
    <Paper
      sx={{
        position: "relative",
        p: 1.25,
        mb: 1,
        alignSelf: "flex-end",
        width: `calc(100% + ${levelOffset}rem)`,
        boxShadow: "var(--shadow-md)",
        borderRadius: 2,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 3 },
        "&:hover .task-tools": { opacity: 1, visibility: "visible" },
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          fontWeight={500}
          noWrap
          sx={{ flex: 1, mr: 1, fontSize: 14 }}
        >
          {task.name}
        </Typography>

        <Box
          className="task-tools"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.2s ease",
          }}
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <Tooltip title="Add Subtask">
            <IconButton size="small">
              <Add size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Task">
            <IconButton size="small">
              <Edit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Actions">
            <IconButton size="small">
              <More size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>

      {/* Info */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar src={task.assignee?.[0]?.avatarUrl} sx={{ width: 24, height: 24, fontSize: 11 }}>
          {task.assignee?.[0]?.name?.[0]}
        </Avatar>
        <Chip
          size="small"
          label={task.priority}
          variant="outlined"
          sx={{ fontSize: 11, height: 22 }}
        />
      </Stack>

      {/* Meta info */}
      <Typography variant="caption" color="text.secondary" fontSize={11}>
        Due: {task.dueDate?.toString() || "-"}
      </Typography>

      {/* Collapse toggle */}
      {hasChildren && task.level < 1 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            mt: 0.5,
            pl: 0.5,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={() => toggleCollapse(task.id)}
        >
          <IconButton size="small" sx={{ p: 0.3 }}>
            {task.collapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ExpandMore size={14} />
            )}
          </IconButton>
          <Typography variant="caption" fontSize={11}>
            {task.childrenIds.length} subtask
            {task.childrenIds.length > 1 ? "s" : ""}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

// ------------------------
// AddItemBox component
// ------------------------
const AddItemBox = ({
  type,
  onClick,
}: {
  type: "column" | "task";
  onClick?: () => void;
}) => {
  const isColumn = type === "column";

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        bgcolor: "#f9fafb",
        borderRadius: 2,
        border: "2px dashed #d1d5db",
        p: isColumn ? 1.5 : 1,
        minHeight: isColumn ? 60 : "auto",
        width: isColumn ? 240 : "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": { bgcolor: "#f0f0f0" },
      }}
    >
      <Typography fontWeight={600} textAlign="center">
        {isColumn ? "+ Add Column" : "+ Add Task"}
      </Typography>
    </Box>
  );
};

// ------------------------
// KanbanBoard component
// ------------------------
export default function KanbanBoard() {
  const { tasks } = useTaskStore();
  const [visibleColumns, setVisibleColumns] = useState<TaskStatus[]>([
    "coming_soon",
    "todo",
    "doing",
    "done",
  ]);

  const [flatTasks, setFlatTasks] = useState<FlatTaskNode[]>([]);

  const activeColumns = useMemo(
    () => ALL_COLUMNS.filter((col) => visibleColumns.includes(col.key)),
    [visibleColumns]
  );

  const addColumn = (status: TaskStatus) => {
    setVisibleColumns((prev) => [...prev, status]);
  };
  // flatten tasks when tasks change
  useEffect(() => {
    setFlatTasks(flattenTasks(tasks));
  }, [tasks]);

  const toggleCollapse = (id: string) => {
    setFlatTasks((prev) => {
      const map: Record<string, FlatTaskNode> = {};
      prev.forEach((t) => (map[t.id] = { ...t }));
      const task = map[id];
      if (!task) return prev;

      task.collapsed = !task.collapsed;
      const updateChildren = (t: FlatTaskNode, hide: boolean) => {
        t.childrenIds.forEach((cid) => {
          const child = map[cid];
          if (child) {
            child.visible = !hide;
            updateChildren(child, hide);
          }
        });
      };
      updateChildren(task, task.collapsed);
      return prev.map((t) => map[t.id]);
    });
  };

  const renderTaskTree = (task: FlatTaskNode) => {
    if (!task.visible || task.level > 1) return null;

    const hasChildren = task.childrenIds.length > 0;

    return (
      <Stack key={task.id} sx={{ ml: task.level * 2 }} spacing={1}>
        <TaskCard task={task} toggleCollapse={toggleCollapse} />
        {hasChildren &&
          task.level < 1 &&
          task.childrenIds.map((cid) => {
            const child = flatTasks.find((t) => t.id === cid);
            if (child) {
              return renderTaskTree(child);
            }
            return null;
          })}
      </Stack>
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1}
      sx={{
        p: 2,
        overflowX: "auto",
        height: "100%",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {activeColumns.map((col) => (
        <Box
          key={col.key}
          sx={{
            flex: "0 0 256px",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f9fafb",
            borderRadius: 2,
            p: 1.5,
            minHeight: 0,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Typography fontWeight={600} sx={{ mb: 1.5 }}>
            {col.label} ({flatTasks.filter((t) => t.status === col.key).length})
          </Typography>

          <Divider />

          <Stack spacing={1.5} mt={2} flex={1} sx={{ overflowY: "auto" }}>
            {flatTasks
              .filter((t) => t.status === col.key && !t.parentId)
              .map((task) => renderTaskTree(task))}
            <AddItemBox type="task" onClick={() => console.log("Add Task")} />
          </Stack>
        </Box>
      ))}

      {activeColumns.length < ALL_COLUMNS.length && (
        <AddItemBox type="column" onClick={() => addColumn("overdue")} />
      )}
    </Stack>
  );
}
