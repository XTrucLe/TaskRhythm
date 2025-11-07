import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoFilterSharp, IoTrash } from "react-icons/io5";
import { TaskFieldKeys } from "../../../types/task";

const METHODS = [
  "contains",
  "does not contain",
  "is",
  "is not",
  "starts with",
  "ends with",
] as const;
type Operation = (typeof METHODS)[number];

interface Filter {
  field: string;
  operation: Operation;
  value: string;
}

interface FilterFieldProps {
  fields: string[];
  filter: Filter;
  onChange: (filter: Filter) => void;
  onDelete?: () => void;
}

const FilterField = ({
  fields,
  filter,
  onChange,
  onDelete,
}: FilterFieldProps) => {
  const handleChange =
    (key: keyof Filter) =>
    (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) =>
      onChange({ ...filter, [key]: e.target.value });

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        minWidth: 400,
        px: 1,
        py: 0.5,
        borderRadius: 2,
        bgcolor: "var(--color-background-secondary)",
      }}
    >
      <Select
        size="small"
        variant="outlined"
        sx={{ width: 120, fontSize: 13, fontWeight: 500 }}
        value={filter.field}
        onChange={handleChange("field")}
      >
        {fields.map((f) => (
          <MenuItem key={f} value={f} sx={{ fontSize: 13, fontWeight: 500 }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </MenuItem>
        ))}
      </Select>

      <Select
        size="small"
        variant="outlined"
        sx={{ width: 156, fontSize: 13, fontWeight: 500 }}
        value={filter.operation}
        onChange={handleChange("operation")}
      >
        {METHODS.map((m) => (
          <MenuItem key={m} value={m} sx={{ fontSize: 13, fontWeight: 500 }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </MenuItem>
        ))}
      </Select>

      <TextField
        size="small"
        variant="standard"
        sx={{ width: 156 }}
        value={filter.value}
        onChange={handleChange("value")}
      />

      {onDelete && (
        <Toolbar
          title="Delete filter"
          sx={{
            paddingLeft: "0px !important",
            minHeight: "32px",
            cursor: "pointer",
          }}
          onClick={onDelete}
        >
          <IoTrash size={18} color="var(--color-danger)" />
        </Toolbar>
      )}
    </Stack>
  );
};

export default function ToolBar() {
  const [filters, setFilters] = useState<Filter[]>([
    { field: "", operation: "contains", value: "" },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const fields = TaskFieldKeys;

  const addFilter = () =>
    filters.length < 5 &&
    setFilters([...filters, { field: "", operation: "contains", value: "" }]);

  const updateFilter = (index: number, f: Filter) =>
    setFilters((prev) => prev.map((item, idx) => (idx === index ? f : item)));

  const deleteFilter = (index: number) =>
    setFilters((prev) =>
      prev.length === 1
        ? [{ field: "", operation: "contains", value: "" }]
        : prev.filter((_, i) => i !== index)
    );
  const addNewTask = () => {
    console.log("Add new task");
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2} gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <Toolbar
          title="Filter"
          sx={{
            padding: "0 !important",
            minHeight: "32px !important",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <IoFilterSharp size={20} />
        </Toolbar>

        {filters.length > 0 && (
          <Typography variant="body2" sx={{ userSelect: "none", pt: 0.5 }}>
            {filters.length} filter{filters.length > 1 ? "s" : ""}
          </Typography>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Button variant="outlined" size="small" onClick={addNewTask}>
          + Add task
        </Button>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          {filters.map((f, i) => (
            <Box
              flexDirection="row"
              key={i}
              display="flex"
              gap={1}
              alignItems="center"
            >
              {i === 0 ? <Typography>Where</Typography> : null}
              <FilterField
                key={i}
                fields={fields}
                filter={f}
                onChange={(nf) => updateFilter(i, nf)}
                onDelete={() => deleteFilter(i)}
              />
            </Box>
          ))}
          <Button variant="outlined" size="small" onClick={addFilter}>
            + Add filter
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
