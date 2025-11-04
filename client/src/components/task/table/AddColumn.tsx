import { Popover, Stack } from "@mui/material";
import type { TaskColumnsDef } from "../../../types/task";
import { MenuItem } from "../../ui/Menu";

type ColumnKeys = keyof TaskColumnsDef;

const columnKeys: ColumnKeys[] = [
  "name",
  "description",
  "status",
  "priority",
  "progress",
  "type",
  "assignee",
  "startDate",
  "dueDate",
  "actualStartDate",
  "completedDate",
  "estimatedHours",
  "loggedHours",
];

type AddColumnProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onChange: (newColumn: ColumnKeys) => void;
};

function AddColumn({ anchorEl, onClose, onChange }: AddColumnProps) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Stack spacing={1} p={1} flexDirection="column">
        {columnKeys.map((key) => (
          <MenuItem key={key} onClick={() => onChange(key)}>
            {key}
          </MenuItem>
        ))}
      </Stack>
    </Popover>
  );
}

export default AddColumn;
