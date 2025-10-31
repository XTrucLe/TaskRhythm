import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import type { TaskStatus } from "../../../types/task";
import { FaTimes } from "react-icons/fa";
import TaskTable from "../../ui/table/TaskTable";
import { useContext, useState } from "react";
import { StatusIncrement } from "../../task/TaskStatus";
import { TaskContext } from "../../../contexts/TaskContext";

type Props = {
  open: boolean;
  onClose: () => void;
  taskId: string;
};

export default function TaskDetail({ open, onClose, taskId }: Props) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { tasks, updateTaskStatus } = useContext(TaskContext);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return null;

  const completedSubtasks =
    task?.subTasks?.filter((t) => t.status === "done").length || 0;
  const totalSubtasks = task?.subTasks?.length || 0;

  const onchangeStatus = (status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "95%",
          maxWidth: 1280,
          height: "90vh",
          bgcolor: "background.paper",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          outline: "none",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2.5}
          py={1}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="h5" fontWeight={600}>
            Task Detail
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <FaTimes size={20} />
          </IconButton>
        </Stack>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            overflow: "hidden",
          }}
        >
          {/* Left column */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRight: "1px solid",
              borderColor: "divider",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              fontSize={24}
              fontWeight={600}
              lineHeight={1.1}
            >
              {task.name}
            </Typography>

            {task.description && (
              <Box mt={2}>
                <Typography variant="body1" color="text.secondary">
                  {task.description}
                </Typography>
              </Box>
            )}

            <Box
              my={3}
              mx="auto"
              width="95%"
              display="grid"
              gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr" }}
              gap={2}
            >
              <Box display="grid" gridTemplateColumns="90px 1fr">
                <Typography variant="subtitle2" color="text.secondary">
                  Assignee:
                </Typography>
                <Typography variant="body1" textOverflow={"hidden"}>
                  {task.assignee.join(", ")}
                </Typography>
              </Box>

              <Box display="grid" gridTemplateColumns="90px 1fr">
                <Typography variant="subtitle2" color="text.secondary">
                  Priority:
                </Typography>
                <Typography variant="body1">
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </Typography>
              </Box>

              <Box display="grid" gridTemplateColumns="90px 1fr">
                <Typography variant="subtitle2" color="text.secondary">
                  Status:
                </Typography>
                <StatusIncrement
                  status={task.status}
                  onchangeStatus={onchangeStatus}
                />
              </Box>

              <Box display="grid" gridTemplateColumns="90px 1fr">
                <Typography variant="subtitle2" color="text.secondary">
                  Due Date:
                </Typography>
                <Typography variant="body1">
                  {task.dueDate?.toLocaleDateString("vi-VN") || "-"}
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box mt={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1" fontWeight={600}>
                  Sub tasks
                </Typography>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={(completedSubtasks / totalSubtasks) * 100}
                    sx={{ width: 100, height: 6, borderRadius: 3 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {`${completedSubtasks} / ${totalSubtasks}`}
                </Typography>
              </Stack>

              <TaskTable
                data={task.subTasks}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            </Box>
          </Box>

          {/* Right column */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              Activities
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
