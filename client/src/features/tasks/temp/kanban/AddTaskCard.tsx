import { Paper, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../../stores/task.store";
import type { Task, TaskStatus } from "../../types/task";

type AddTaskCardProps = {
  level?: number;
  parentId?: string;
  column: TaskStatus;
  autoFocus?: boolean;
  onReset?: () => void;
};

export default function AddTaskCard({
  level = 0,
  parentId,
  column,
  autoFocus = true,
  onReset = () => {},
}: AddTaskCardProps) {
  const initValue: Omit<Task, "id"> = {
    name: "",
    level,
    parentId: parentId || null,
    status: column,
    type: "task",
    priority: "low",
  };
  const [value, setValue] = useState<Omit<Task, "id">>(initValue);
  const { addTask, addSubTask } = useTaskStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const reset = () => {
    setValue(initValue);
    onReset();
  };
  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => {
      if (!value.name.trim()) reset();
    }, 100);
  };
  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.name.trim()) {
      const newTask = { ...value, id: Date.now().toString(), subTasks: [] };
      if (parentId) addSubTask(parentId, newTask);
      else addTask({ ...newTask, parentId: null, level: 0 });
      reset();
    } else if (e.key === "Escape") reset();
  };

  return (
    <Paper elevation={3} sx={{ mb: 2 }}>
      <TextField
        placeholder="New task name..."
        value={value.name}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        fullWidth
        sx={{ "& fieldset": { border: "none", outline: "none" } }}
      />
    </Paper>
  );
}
