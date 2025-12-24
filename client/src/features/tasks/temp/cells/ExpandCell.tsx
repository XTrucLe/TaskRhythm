import { IconButton } from "@mui/material";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

type ExpandCellProps = {
  expanded: boolean;
  toggleExpanded?: () => void;
};

export default function ExpandCell({
  expanded,
  toggleExpanded,
}: ExpandCellProps) {
  return (
    <IconButton onClick={toggleExpanded}>
      {expanded ? <FaChevronDown size={15} /> : <FaChevronRight size={15} />}
    </IconButton>
  );
}
