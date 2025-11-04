import { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { FaPause, FaPlay } from "react-icons/fa";

type TimerProps = {
  initTime?: number;
};

function Timer({ initTime = 0 }: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initTime);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
  };

  useEffect(() => {
    setTotalSeconds(initTime);
  }, [initTime]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeText = isRunning
    ? `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    : `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}${
        minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
      }`;

  return (
    <Typography variant="body1" display="flex" alignItems="center">
      <IconButton onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? <FaPause size={14} /> : <FaPlay size={14} />}
      </IconButton>
      {timeText}
    </Typography>
  );
}

export default Timer;
