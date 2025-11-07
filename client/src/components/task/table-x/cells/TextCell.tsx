import { TextField, Typography } from "@mui/material";
import type { CellProps } from "../types/cells";

function TextCell({ value, onChange, editing, onBlur }: CellProps) {
  if (editing) {
    return (
      <TextField
        value={value.charAt(0).toUpperCase() + value.slice(1)}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        fullWidth
        sx={{ "& fieldset": { border: "none", outline: "none" } }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }
  return (
    <Typography variant="body1" sx={{ cursor: "pointer", userSelect: "none" }}>
      {value.charAt(0).toUpperCase() + value.slice(1) || "—"}
    </Typography>
  );
}

export default TextCell;
