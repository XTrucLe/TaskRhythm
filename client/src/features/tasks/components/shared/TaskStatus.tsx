import { memo, useState } from "react";
import {
  MdPendingActions as ComingSoon,
  MdOutlineCheckCircle as Done,
  MdOutlineAccessTime as Doing,
  MdErrorOutline as Overdue,
  MdOutlineTimer as DoneLate,
} from "react-icons/md";
import { PiListChecksBold as Todo } from "react-icons/pi";
import { FaTimes as Cancelled } from "react-icons/fa";
import type { TaskStatus } from "../../types/task";
import type { JSX } from "react";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaCaretRight } from "react-icons/fa";

const IconColorDefault = "white";

const statusOrder: TaskStatus[] = [
  "coming_soon",
  "todo",
  "doing",
  "done",
  "overdue",
  "done_late",
  "cancelled",
];

const DropdownStatus: TaskStatus[] = [
  "todo",
  "doing",
  "done",
  "overdue",
  "done_late",
  "cancelled",
];

const NotChangeStatus: TaskStatus[] = ["done", "done_late", "cancelled"];

// Mapping màu cho từng status
const StatusColors: Record<TaskStatus, string> = {
  coming_soon: "gray",
  todo: "slateblue",
  doing: "blue",
  done: "green",
  overdue: "red",
  done_late: "darkorange",
  cancelled: "red",
};

// Mapping icon cho từng status
const StatusIcons: Record<TaskStatus, JSX.Element> = {
  coming_soon: <ComingSoon size={16} color={IconColorDefault} />,
  todo: <Todo size={16} color={IconColorDefault} />,
  doing: <Doing size={16} color={IconColorDefault} />,
  done: <Done size={16} color={IconColorDefault} />,
  overdue: <Overdue size={16} color={IconColorDefault} />,
  done_late: <DoneLate size={16} color={IconColorDefault} />,
  cancelled: <Cancelled size={16} color={IconColorDefault} />,
};

// Component hiển thị ô status
const StatusCell = ({
  status,
  opacity = 0.7,
}: {
  status: TaskStatus;
  opacity?: number;
}) => (
  <Typography
    variant="body1"
    className="flex items-center gap-1 font-bold text-white"
    style={{
      backgroundColor: StatusColors[status],
      padding: "0.2rem 0.5rem",
      borderRadius: "0.5rem",
      width: "fit-content",
      fontSize: "0.8rem",
      minHeight: "2rem",
      opacity,
    }}
  >
    {StatusIcons[status]}
    {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
  </Typography>
);

// Dropdown để thay đổi status
const StatusDropdown = ({
  status,
  onchange,
}: {
  status: TaskStatus;
  onchange: (status: TaskStatus) => void;
}) => {
  const [open, setOpen] = useState(false);
  const hide = NotChangeStatus.includes(status);
  if (!onchange) return null;

  const onOpen = () => {
    if (hide) return;
    setOpen(true);
  };

  return (
    <Tooltip title={hide ? "" : "Change Status"} arrow placement="top">
      <Select
        open={open}
        onClose={() => setOpen(false)}
        onOpen={onOpen}
        value={status}
        onChange={(e) => onchange(e.target.value as TaskStatus)}
        size="small"
        sx={{
          "& .MuiSelect-select": {
            padding: 0,
            display: "flex",
            alignItems: "center",
          },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "& .MuiSelect-icon": { display: "none" },
        }}
      >
        {DropdownStatus.map((statusKey) => (
          <MenuItem key={statusKey} value={statusKey}>
            <StatusCell status={statusKey as TaskStatus} opacity={1} />
          </MenuItem>
        ))}
      </Select>
    </Tooltip>
  );
};

const StatusIncrement = memo(
  ({
    status,
    onchangeStatus,
  }: {
    status: TaskStatus;
    onchangeStatus?: (newStatus: TaskStatus) => void;
  }) => {
    const handleNextStatus = () => {
      if (!onchangeStatus) return;
      if (NotChangeStatus.includes(status)) return;
      const currentIndex = statusOrder.indexOf(status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      const nextStatus = statusOrder[nextIndex];
      onchangeStatus(nextStatus);
    };

    return (
      <Box
        display="flex"
        flexDirection="row"
        bgcolor={StatusColors[status]}
        borderRadius={1}
        width="fit-content"
      >
        <StatusCell status={status} opacity={1} />
        {!NotChangeStatus.includes(status) && (
          <Box display="flex" alignItems="center">
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ ml: 0.5, borderRightWidth: 2 }}
            />
            <IconButton
              size="small"
              sx={{ padding: 0, mx: 0.5 }}
              onClick={handleNextStatus}
            >
              <FaCaretRight size={16} color={IconColorDefault} />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  },
  (prev, next) => prev.status === next.status
);

export {
  StatusColors,
  StatusIcons,
  StatusCell,
  StatusDropdown,
  StatusIncrement,
};
