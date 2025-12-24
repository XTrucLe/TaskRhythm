import { TableRow, TableCell, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import type { Task } from "../../types/task";

type NewRowProps = {
  task: Omit<Task, "id">;
  onSave: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
};

export default function NewRow({ task, onSave, onCancel }: NewRowProps) {
  const [value, setValue] = useState(task);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => {
      if (!value.name.trim()) onCancel();
    }, 100);
  };

  const handleFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (value.name.trim()) onSave(value);
      else onCancel();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <TableRow>
      <TableCell
        colSpan={6}
        sx={{
          backgroundColor: "grey.50",
          position: "sticky",
          left: 0,
          zIndex: 10,
        }}
      >
        <TextField
          placeholder="New task name..."
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          fullWidth
          inputRef={inputRef}
          sx={{
            "& fieldset": { border: "none", outline: "none" },
            pl: value.level ? `${value.level * 8 + 38}px` : "auto",
          }}
        />
      </TableCell>
    </TableRow>
  );
}
