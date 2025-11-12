import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoFilterSharp, IoTrash } from "react-icons/io5";
import { FaColumns } from "react-icons/fa";
import { useTaskColumnStore } from "../../../store/taskColumn.store";
import { RiResetLeftLine } from "react-icons/ri";

const METHODS = [
  "contains",
  "does not contain",
  "is",
  "is not",
  "starts with",
  "ends with",
] as const;

export default function ToolBar() {
  const [filters, setFilters] = useState([
    { field: "", operation: "contains", value: "" },
  ]);
  const { columns, allColumns, addColumns, removeColumns, reset } =
    useTaskColumnStore();

  // ✅ Quản lý độc lập 2 popover
  const [anchor, setAnchor] = useState<{
    filter: HTMLElement | null;
    columns: HTMLElement | null;
  }>({ filter: null, columns: null });

  const fields = allColumns;

  const openPopover =
    (key: keyof typeof anchor) => (e: React.MouseEvent<HTMLElement>) =>
      setAnchor((prev) => ({ ...prev, [key]: e.currentTarget }));

  const closePopover = (key: keyof typeof anchor) =>
    setAnchor((prev) => ({ ...prev, [key]: null }));

  const addFilter = () =>
    setFilters((prev) => [
      ...prev,
      { field: "", operation: "contains", value: "" },
    ]);
  const updateFilter = (
    index: number,
    newFilter: { field: string; operation: string; value: string }
  ) =>
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[index] = newFilter;
      return newFilters;
    });
  const deleteFilter = (index: number) =>
    setFilters((prev) => prev.filter((_, i) => i !== index));

  const addNewTask = () => console.log("Add new task");

  const checked = (field: string) => {
    return columns.some((col) => col.key === field);
  };
  const onCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      addColumns(id);
    } else {
      removeColumns(id);
    }
  };

  const resetColumn = () => reset();

  return (
    <Box display="flex" justifyContent="flex-end" p={2} gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <Toolbar
          sx={{
            p: "0 !important",
            minHeight: "32px !important",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={openPopover("filter")}
        >
          <IoFilterSharp size={20} />
        </Toolbar>
        {filters.length > 0 && (
          <Typography variant="body2" sx={{ userSelect: "none", pt: 0.5 }}>
            {filters.length} filter{filters.length > 1 ? "s" : ""}
          </Typography>
        )}
      </Box>

      {/* COLUMNS + NEW TASK */}
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip title="Manage Columns">
          <IconButton
            size="small"
            color="inherit"
            onClick={openPopover("columns")}
          >
            <FaColumns />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          size="small"
          sx={{ height: 28, fontSize: 13, fontWeight: 600 }}
          onClick={addNewTask}
        >
          New task
        </Button>
      </Box>

      {/* === POPOVER: FILTER === */}
      <Popover
        open={Boolean(anchor.filter)}
        anchorEl={anchor.filter}
        onClose={() => closePopover("filter")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          {filters.map((f, i) => (
            <Stack
              key={i}
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
              {i === 0 && <Typography>Where</Typography>}

              {/* FIELD */}
              <Select
                size="small"
                sx={{ width: 120, fontSize: 13, fontWeight: 500 }}
                value={f.field}
                onChange={(e) =>
                  updateFilter(i, { ...f, field: e.target.value })
                }
              >
                {fields.map((field) => (
                  <MenuItem
                    key={field.key}
                    value={field.key}
                    sx={{ fontSize: 13, fontWeight: 500 }}
                  >
                    {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
                  </MenuItem>
                ))}
              </Select>

              {/* OPERATION */}
              <Select
                size="small"
                sx={{ width: 150, fontSize: 13, fontWeight: 500 }}
                value={f.operation}
                onChange={(e) =>
                  updateFilter(i, { ...f, operation: e.target.value })
                }
              >
                {METHODS.map((m) => (
                  <MenuItem key={m} value={m} sx={{ fontSize: 13 }}>
                    {m}
                  </MenuItem>
                ))}
              </Select>

              {/* VALUE */}
              <TextField
                size="small"
                variant="standard"
                sx={{ width: 160 }}
                value={f.value}
                onChange={(e) =>
                  updateFilter(i, { ...f, value: e.target.value })
                }
              />

              <IconButton
                size="small"
                onClick={() => deleteFilter(i)}
                sx={{ color: "var(--color-danger)" }}
              >
                <IoTrash size={16} />
              </IconButton>
            </Stack>
          ))}

          <Button variant="outlined" size="small" onClick={addFilter}>
            + Add filter
          </Button>
        </Box>
      </Popover>

      {/* === POPOVER: COLUMNS === */}
      <Popover
        open={Boolean(anchor.columns)}
        anchorEl={anchor.columns}
        onClose={() => closePopover("columns")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box minWidth={200}>
          <Box
            position="sticky"
            top={0}
            zIndex={10}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            pb={1}
            borderBottom="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
          >
            <Typography fontWeight={600} variant="subtitle1">
              Manage Columns
            </Typography>
            <IconButton
              onClick={resetColumn}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  transform: "rotate(-20deg)",
                },
                transition: "0.2s",
              }}
            >
              <RiResetLeftLine size={20} />
            </IconButton>
          </Box>

          <Box flex={1} my={2} maxHeight={360} overflow="auto" pl={1}>
            <Stack direction="column" spacing={1}>
              {fields
                .filter(
                  (field) => field.key !== "name" && field.key !== "status"
                )
                .map((field) => (
                  <FormControlLabel
                    key={field.key}
                    control={
                      <Checkbox
                        checked={checked(field.key)}
                        onChange={onCheckedChange}
                        id={field.key}
                      />
                    }
                    label={field.label}
                  />
                ))}
            </Stack>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
