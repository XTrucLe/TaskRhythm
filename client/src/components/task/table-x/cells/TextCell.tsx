import { TextField, Typography } from "@mui/material";
import type { CellProps } from "../types/cells";
import { useState } from "react";

export default function TextCell({
  value = "",
  onChange,
  editing,
  onBlur,
  onClick,
}: CellProps) {
  const [displayValue, setDisplayValue] = useState<string>(value);

  if (editing) {
    return (
      <TextField
        value={displayValue === "—" ? "" : displayValue}
        onChange={(e) => setDisplayValue(e.target.value)}
        onBlur={onBlur}
        fullWidth
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{
          "& .MuiInputBase-root": { p: 0 },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange?.(displayValue);
            onBlur?.();
          }
        }}
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Typography
      variant="body2"
      sx={{
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      onClick={onClick}
    >
      {displayValue}
    </Typography>
  );
}
