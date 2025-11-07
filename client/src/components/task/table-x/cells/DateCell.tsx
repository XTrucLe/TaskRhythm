import React from "react";
import type { CellProps } from "../types/cells";
import { TextField, Typography } from "@mui/material";

function DateCell({ value, onChange, editing, onBlur }: CellProps) {
  if (!value) return <Typography variant="body1">—</Typography>;
  if (editing) {
    return (
      <TextField
        type="date"
        value={value}
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
    <Typography variant="body1" sx={{ cursor: "pointer", userSelect: "none" }}>
      {formatDate(value)}
    </Typography>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("vi-VN");
};
export default React.memo(DateCell);
