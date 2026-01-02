import SearchBox from "@/components/ui/SearchBox";
import { Button, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa";

type Props = {
  titleTooltip?: string;
  value?: string;
  searchOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  btnOnClick?: () => void;
};

function ToolBox({ searchOnchange, titleTooltip, btnOnClick, value }: Props) {
  return (
    <div className="max-w-[360px] self-end ml-auto flex mb-1 gap-1">
      <SearchBox onChange={searchOnchange} value={value} />
      <Tooltip title={titleTooltip}>
        <Button
          variant="contained"
          style={{
            minWidth: "80px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "14px",
            gap: "4px",
          }}
          onClick={btnOnClick}
        >
          <FaPlus size={14} />
          New
        </Button>
      </Tooltip>
    </div>
  );
}

export default ToolBox;
