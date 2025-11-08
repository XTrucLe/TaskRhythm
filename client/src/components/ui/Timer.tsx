import { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { FaPause, FaPlay } from "react-icons/fa";

type TimerProps = {
  initTime?: number;
};

export default function Timer({ initTime = 0 }: TimerProps) {
  const [seconds, setSeconds] = useState(initTime);
  const [running, setRunning] = useState(false);

  useEffect(() => setSeconds(initTime), [initTime]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const timeText = running
    ? `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`
    : [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ") || "0m";

  return (
    <Typography variant="body1" display="flex" alignItems="center">
      <IconButton
        onClick={() => setRunning((v) => !v)}
        size="small"
        sx={{
          p: 1,
          mr: 1,
          bgcolor: running ? "success.light" : "error.light",
          "&:hover": {
            bgcolor: running ? "success.light" : "error.light",
          },
        }}
      >
        {running ? (
          <FaPause size={14} color="white" />
        ) : (
          <FaPlay size={14} color="white" />
        )}
      </IconButton>
      {timeText}
    </Typography>
  );
}
