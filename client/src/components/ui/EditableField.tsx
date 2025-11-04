import { useEffect, useState } from "react";
import { InputBase, Typography } from "@mui/material";

type EditableFieldProps = {
  value: string;
  onSave: (newValue: string) => void;
  editing?: boolean;
};

export default function EditableField({
  value,
  onSave,
  editing = false,
}: EditableFieldProps) {
  const [temp, setTemp] = useState(value);

  // Chỉ sync lại khi không đang edit
  useEffect(() => {
    if (!editing) setTemp(value);
  }, [value, editing]);

  const handleSave = () => {
    if (temp.trim() !== value.trim()) {
      onSave(temp.trim());
    }
  };

  if (!editing) {
    return (
      <Typography
        variant="body1"
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        {value || "—"}
      </Typography>
    );
  }

  return (
    <InputBase
      fullWidth
      value={temp}
      onChange={(e) => setTemp(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") setTemp(value);
      }}
      sx={{
        border: "none",
        outline: "none",
        "& input": { padding: 0 },
      }}
    />
  );
}
