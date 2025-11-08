import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useTaskStore } from "../../../store/task.store";
import { PriorityDropdown } from "../TaskPriorities";
import { StatusIncrement } from "../TaskStatus";
import SubTaskTable from "../table";
import EditableField from "../../ui/EditableField";
import EditableDate from "../../ui/EditableDate";
import Timer from "../../ui/Timer";
import type { TaskStatus } from "../../../types/task";
import AssigneeCell from "../table-x/cells/AssigneeCell";
import { AllUsers } from "../../../mock/tasks";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TaskDetail({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { updateTaskStatus, selectedTask: task } = useTaskStore();

  if (!task) return null;

  const completedSubtasks =
    task.subTasks?.filter((t) => t.status === "done").length || 0;
  const totalSubtasks = task.subTasks?.length || 0;

  const onchangeStatus = (status: TaskStatus) => {
    updateTaskStatus(task.id, status);
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
          flexDirection: "column",
          border: "none",
          outline: "none",
        }}
      >
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

        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr", md: "2.3fr 1fr" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
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
              <Typography mt={2} variant="body1" color="text.secondary">
                {task.description}
              </Typography>
            )}

            <Box
              my={3}
              mx="auto"
              width="95%"
              display="grid"
              gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr" }}
              gap={1}
            >
              <InfoRow
                label="Assignee:"
                value={
                  <AssigneeCell
                    value={task.assignee || undefined}
                    allUsers={AllUsers}
                    editing={task.type !== "task" ? false : true}
                  />
                }
              />
              <InfoRow
                label="Priority:"
                value={
                  <PriorityDropdown
                    priority={task.priority}
                    onChange={(newPriority) =>
                      console.log("New priority:", newPriority)
                    }
                  />
                }
              />
              <InfoRow
                label="Status:"
                value={
                  <StatusIncrement
                    status={task.status}
                    onchangeStatus={onchangeStatus}
                  />
                }
              />
              <InfoRow
                label="Due Date:"
                value={
                  <EditableDate
                    date={task.dueDate ? new Date(task.dueDate) : undefined}
                    onSave={(newDate) => console.log("New due date:", newDate)}
                    editing
                  />
                }
              />
              <InfoRow
                label="Estimate time:"
                value={
                  <EditableField
                    value={task.estimatedHours?.toString() || "-"}
                    editing
                    onSave={(newValue) =>
                      console.log("New estimated hours:", newValue)
                    }
                  />
                }
              />
              <InfoRow
                label="Tracking time:"
                value={
                  <Timer
                    initTime={task.loggedHours ? task.loggedHours * 3600 : 0}
                  />
                }
              />
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Typography fontWeight={600}>Sub tasks</Typography>
              <LinearProgress
                variant="determinate"
                value={(completedSubtasks / totalSubtasks) * 100}
                sx={{ width: 100, height: 6, borderRadius: 3 }}
              />
              <Typography variant="body2" color="text.secondary">
                {`${completedSubtasks} / ${totalSubtasks}`}
              </Typography>
            </Stack>

            <SubTaskTable
              data={task.subTasks}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </Box>

          <Box
            sx={{
              p: 2,
              overflowY: "auto",
              maxWidth: { md: "400px" },
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

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="100px 1fr"
      height={36}
      alignItems="center"
    >
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Box>{value}</Box>
    </Box>
  );
}
