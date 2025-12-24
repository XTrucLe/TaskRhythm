import { Box, IconButton, Tooltip } from "@mui/material";
import {
  FiPlusCircle as Add,
  FiEdit as Edit,
  FiTrash as Delete,
} from "react-icons/fi";

type TaskTableToolboxProps = {
  hide?: ("add" | "edit" | "delete")[];
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TaskTableToolbox({
  hide,
  onAdd,
  onEdit,
  onDelete,
}: TaskTableToolboxProps) {
  return (
    <Box
      className="table-toolbox"
      sx={{
        display: "none",
        flexDirection: "row",
        width: "fit-content",
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        transition: "opacity 0.2s ease",
      }}
    >
      {!hide?.includes("add") && (
        <Tooltip title="Add" arrow>
          <IconButton size="small" onClick={onAdd}>
            <Add size={16} />
          </IconButton>
        </Tooltip>
      )}
      {!hide?.includes("edit") && (
        <Tooltip title="Edit" arrow>
          <IconButton size="small" onClick={onEdit}>
            <Edit size={16} />
          </IconButton>
        </Tooltip>
      )}
      {!hide?.includes("delete") && (
        <Tooltip title="Delete" arrow>
          <IconButton size="small" onClick={onDelete}>
            <Delete size={16} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
