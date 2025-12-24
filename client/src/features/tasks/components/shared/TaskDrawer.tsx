import {
  Avatar,
  Button,
  Chip,
  Divider,
  Drawer,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Task } from "../../types/task";
import { useTaskStore } from "../../stores/task.store";

function TaskDrawer({
  isOpen,
  onClose,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}) {
  const { claimTask, updateTaskStatus } = useTaskStore();

  if (!task) {
    return null;
  }

  const isLeaf = true; // Not implemented yet
  const canEdit = true; // Not implemented yet
  const canDelete = true; // Not implemented yet
  const canAssign = true; // Not implemented yet
  const canClaim = task.assignee === null; // Not implemented yet
  const handleAssign = () => {
    if (canAssign) return;
  };

  const handleClaim = () => {
    if (canClaim) {
      claimTask(task.id, "1"); // Claim by user with ID 1 for demo
    }
  };

  const handleDelete = () => {
    if (canDelete) {
      return;
    }
  };
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: 420, p: 3 } }}
    >
      <Stack spacing={3}>
        {/* TIÊU ĐỀ */}
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {task.name}
        </Typography>
        <Divider />

        {/* THÔNG TIN VIP */}
        <Grid container spacing={2}>
          {/* Cột 1 */}
          <Grid size={6}>
            <Stack spacing={2}>
              {/* Priority */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Priority
                </Typography>
                <Chip
                  label={task.priority || "Normal"}
                  size="small"
                  color={
                    task.priority === "high"
                      ? "error"
                      : task.priority === "medium"
                      ? "warning"
                      : "success"
                  }
                />
              </Stack>

              {/* Assignee */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Assignee
                </Typography>
                <Avatar
                  sx={{
                    width: 26,
                    height: 26,
                    fontSize: 12,
                    bgcolor: "#2563eb20",
                    color: "#2563eb",
                  }}
                >
                  {task.assignee ? task.assignee[0].name : "?"}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {task.assignee
                    ? task.assignee.map((a) => a.name).join(", ")
                    : "Unassigned"}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Cột 2 */}
          <Grid size={6}>
            <Stack spacing={2}>
              {/* Status */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={task.status.toUpperCase().replace("_", " ")}
                  size="small"
                  color={
                    task.status === "done"
                      ? "success"
                      : task.status === "todo"
                      ? "warning"
                      : "default"
                  }
                />
              </Stack>

              {/* Select cập nhật trạng thái */}
              {isLeaf && canEdit && (
                <Select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="todo">Todo</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        {/* ACTIONS */}
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Button
            variant="contained"
            onClick={handleAssign}
            disabled={!canAssign}
            size="small"
          >
            Assign
          </Button>
          <Button
            variant="outlined"
            onClick={handleClaim}
            disabled={!canClaim}
            size="small"
          >
            Claim
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!canDelete}
            size="small"
          >
            Delete
          </Button>
        </Stack>

        <Divider />

        {/* COMMENTS */}
        <Stack spacing={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Task Updates & Comments
          </Typography>
          <TextField
            label="Add Comment"
            multiline
            rows={4}
            placeholder="Add progress notes or blockages here..."
            fullWidth
          />
          <Button variant="contained" size="small">
            Submit Comment
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default TaskDrawer;
