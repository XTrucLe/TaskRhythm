import { TextField, Typography } from "@mui/material";
import type { CellProps } from "./CellProps";

function TextCell({ value, onChange, editing, onBlur }: CellProps) {
  if (!editing) {
    return (
      <TextField
        value={value}
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
      {value || "—"}
    </Typography>
  );
}

export default TextCell;
