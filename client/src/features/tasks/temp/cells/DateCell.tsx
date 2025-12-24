import React from "react";
import type { CellProps } from "../../types/cells";
import { TextField, Typography } from "@mui/material";

function DateCell({ value = "-", onChange, editing, onBlur }: CellProps) {
  if (editing) {
    return (
      <TextField
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        fullWidth
        sx={{
          "& fieldset": { border: "none", outline: "none" },
          "& .MuiOutlinedInput-input": { padding: 0 },
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }
  return (
    <Typography
      variant="body1"
      sx={{
        cursor: "pointer",
        userSelect: "none",
        color: value ? "auto" : "grey.500",
      }}
    >
      {value ? value : "None"}
    </Typography>
  );
}

export default React.memo(DateCell);
