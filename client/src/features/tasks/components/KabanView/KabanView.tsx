import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useTaskStore } from "../../stores/task.store";
import { useTaskColumnStore } from "../../stores/taskColumn.store";
import TaskCard from "../../temp/kanban/TaskCard";
import AddTaskCard from "../../temp/kanban/AddTaskCard";

export default function KabanView() {
  const { tasks, expanded, toggleExpanded } = useTaskStore();
  const { statusColumns: columns } = useTaskColumnStore();
  const [addNewTask, setAddNewTask] = useState<{
    parentId: string | undefined;
    level: number;
    column: string;
  } | null>(null);
  const resetAddNewTask = () => setAddNewTask(null);

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1}
      sx={{ px: 2, overflowX: "auto", height: `calc(100vh - 140px)` }}
    >
      {columns.map((col) => (
        <Stack
          key={col.key}
          sx={{
            flex: "0 0 320px",
            minWidth: 240,
            maxWidth: 320,
            overflowY: "auto",
            maxHeight: "calc(100vh - 140px)",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f9fafb",
            borderRadius: 2,
            p: 1,
            minHeight: 0,
          }}
        >
          <Box
            fontWeight={600}
            sx={{
              position: "sticky",
              zIndex: 10,
              top: 0,
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {col.label} ({tasks.filter((t) => t.status === col.key).length})
            </Typography>
            <Tooltip title="Add New Task">
              <IconButton
                size="small"
                onClick={() =>
                  setAddNewTask({
                    parentId: undefined,
                    level: 0,
                    column: col.key,
                  })
                }
              >
                <FiPlusCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider />

          <Stack spacing={1.5} mt={2} flex={1} sx={{ overflowY: "auto" }}>
            {tasks
              .filter((t) => t.status === col.key && !t.parentId)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  expanded={expanded}
                  toggleCollapse={toggleExpanded}
                  addNewTask={addNewTask}
                  setAddNewTask={setAddNewTask}
                />
              ))}
            {addNewTask?.parentId === undefined &&
              addNewTask?.column === col.key && (
                <AddTaskCard
                  level={addNewTask.level}
                  parentId={undefined}
                  column={col.key}
                  onReset={resetAddNewTask}
                />
              )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
