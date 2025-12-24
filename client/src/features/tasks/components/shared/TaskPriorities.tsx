import { useState } from "react";
import type { TaskPriority } from "../../types/task";
import { Box, Chip, Select, MenuItem } from "@mui/material";
import { IoFlagSharp } from "react-icons/io5";

type TaskPrioritiesProps = {
  priority: TaskPriority;
  onChange: (newPriority: TaskPriority) => void;
};

type PriorityColorsType = "info" | "warning" | "danger";

const PriorityColors: Record<TaskPriority, PriorityColorsType> = {
  low: "info",
  medium: "warning",
  high: "danger",
};
const PriorityCell = ({ priority }: Omit<TaskPrioritiesProps, "onChange">) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IoFlagSharp
        size={20}
        color={`var(--color-${PriorityColors[priority]})`}
      />
      <Chip
        label={priority.charAt(0).toUpperCase() + priority.slice(1)}
        size="small"
      />
    </Box>
  );
};

const PriorityDropdown = ({ priority, onChange }: TaskPrioritiesProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Select
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      value={priority}
      onChange={(e) => onChange(e.target.value as TaskPriority)}
      size="small"
      sx={{
        "& .MuiSelect-select": {
          padding: 0,
          display: "flex",
          alignItems: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "& .MuiSelect-icon": { display: "none" },
      }}
    >
      {(["low", "medium", "high"] as TaskPriority[])
        .reverse()
        .map((priorityKey) => (
          <MenuItem key={priorityKey} value={priorityKey}>
            <PriorityCell priority={priorityKey} />
          </MenuItem>
        ))}
    </Select>
  );
};

export { PriorityCell, PriorityDropdown };
