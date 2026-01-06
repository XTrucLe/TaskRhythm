import { Tooltip, Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";

export const NewButton = ({
  onClick,
  title = "New",
  icon,
}: {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <Tooltip title={title}>
      <Button
        variant="contained"
        onClick={onClick}
        className="!min-w-9 h-9 !p-1 md:!px-3 overflow-hidden group shrink-0 rounded-lg"
      >
        <div className="flex flex-wrap content-start h-full gap-1">
          <div className="h-7 flex items-center justify-center shrink-0 px-1">
            {icon || <FaPlus size={14} />}
          </div>
          <div className="h-7 flex items-center normal-case mr-1 max-md:hidden">
            <span className="whitespace-nowrap">New</span>
          </div>
        </div>
      </Button>
    </Tooltip>
  );
};
