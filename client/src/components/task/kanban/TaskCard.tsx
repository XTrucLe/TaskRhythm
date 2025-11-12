import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FiPlusCircle as Add,
  FiEdit as Edit,
  FiMoreHorizontal as More,
} from "react-icons/fi";
import { BiSolidRightArrow as ExpandArrow } from "react-icons/bi";
import { formatDate } from "../../../utils/date.helper";
import AddTaskCard from "./AddTaskCard";
import type { Task } from "../../../types/task";
import type { UserBase } from "../../../types/user";

type TaskCardProps = {
  task: Task;
  expanded: string[];
  toggleCollapse: (id: string) => void;
  addNewTask?: {
    parentId: string | undefined;
    level: number;
    column: string;
  } | null;
  setAddNewTask?: React.Dispatch<
    React.SetStateAction<{
      parentId: string | undefined;
      level: number;
      column: string;
    } | null>
  >;
};

export default function TaskCard({
  task,
  expanded,
  toggleCollapse,
  addNewTask,
  setAddNewTask,
}: TaskCardProps) {
  if (!task || (task.level !== 0 && task.status === "done")) return null;

  const {
    id,
    name,
    level = 0,
    status,
    assignee = [],
    dueDate,
    subTasks = [],
  } = task;
  const hasChildren = subTasks.length > 0;
  const hasExpanded = expanded.includes(id);
  const levelOffset = level * 16;

  const resetAddNewTask = () => setAddNewTask?.(null);
  const handleAddSubTask = () =>
    setAddNewTask?.({ parentId: id, level: level + 1, column: status });

  return (
    <Stack sx={{ width: "100%" }}>
      <Paper
        sx={{
          p: 1.25,
          pb: 0.5,
          mb: 1,
          alignSelf: "flex-end",
          width: `calc(100% - ${levelOffset}px)`,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: "#fff",
          cursor: "pointer",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography
            variant="subtitle2"
            fontWeight={600}
            noWrap
            sx={{ flex: 1, mr: 1, userSelect: "none" }}
          >
            {name}
          </Typography>
          <Stack direction="row">
            <IconButton size="small">
              <Edit size={16} />
            </IconButton>
            <IconButton size="small">
              <More size={16} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Assignee & DueDate */}
        <Stack
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="end"
          mb={1}
        >
          {assignee.length > 0 && <Assignee value={assignee} />}
          {dueDate && (
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: 12, userSelect: "none" }}
            >{`Due: ${formatDate(dueDate)}`}</Typography>
          )}
        </Stack>

        {/* SubTasks Toggle */}
        {hasChildren && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <IconButton
                size="small"
                onClick={() => toggleCollapse(id)}
                sx={{
                  transform: hasExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <ExpandArrow size={16} />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ fontSize: 12, userSelect: "none" }}
              >
                {`${subTasks.length} Sub-tasks`}
              </Typography>
            </Stack>
            <IconButton size="small" onClick={handleAddSubTask}>
              <Add size={16} />
            </IconButton>
          </Stack>
        )}
      </Paper>

      {/* Render SubTasks */}
      {hasExpanded &&
        subTasks.map((child) => (
          <TaskCard
            key={child.id}
            task={child}
            expanded={expanded}
            toggleCollapse={toggleCollapse}
            addNewTask={addNewTask}
            setAddNewTask={setAddNewTask}
          />
        ))}

      {/* Render AddTaskCard */}
      {addNewTask?.parentId === id && (
        <Box sx={{ ml: `${(level + 1) * 16}px` }}>
          <AddTaskCard
            level={level + 1}
            parentId={id}
            column={status}
            onReset={resetAddNewTask}
          />
        </Box>
      )}
    </Stack>
  );
}

const Assignee = ({ value }: { value: UserBase[] }) => (
  <Box sx={{ display: "flex" }}>
    {value.map((user, i) => (
      <Tooltip key={user.id} title={user.name}>
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            border: "1px solid white",
            mr: i !== value.length - 1 ? -1.2 : 0,
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale(1.08)", zIndex: 10 },
          }}
        >
          {user.name[0]}
        </Avatar>
      </Tooltip>
    ))}
  </Box>
);
