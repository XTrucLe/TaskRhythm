import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";

type EditableDateProps = {
  date?: Date;
  onSave: (newDate: Date) => void;
  editing?: boolean;
};

function EditableDate({ date, onSave, editing = false }: EditableDateProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(date);

  useEffect(() => {
    if (!editing) setTempDate(date);
  }, [date, editing]);

  if (!editing) {
    return (
      <Typography
        variant="body1"
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        {date ? date.toLocaleDateString("vi-VN") : "—"}
      </Typography>
    );
  }

  const handleSave = () => {
    if (tempDate && tempDate.getTime() !== date?.getTime()) {
      onSave(tempDate);
    }
  };
  return (
    <TextField
      type="date"
      value={tempDate ? tempDate.toISOString().split("T")[0] : ""}
      onChange={(e) => setTempDate(new Date(e.target.value))}
      onBlur={handleSave}
      sx={{
        width: "100%",
        "& fieldset": { border: "none" },
        "&:focus-within": {
          border: "none",
          outline: "none",
        },
        "& .MuiInputBase-input": { padding: "4px !important" },
      }}
    />
  );
}

export default EditableDate;
