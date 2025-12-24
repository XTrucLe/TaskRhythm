
import { BsFillKanbanFill, BsTable } from "react-icons/bs";
import { FaChartGantt } from "react-icons/fa6";

type ViewStyle = "table" | "kanban" | "gantt";

type Props = {
  viewStyle: ViewStyle;
  onChange: (style: ViewStyle) => void;
};

const viewIcons = {
  table: <BsTable size={20} color="#6B7280" />,
  kanban: <BsFillKanbanFill size={20} color="#3B82F6" />,
  gantt: <FaChartGantt size={20} color="#8B5CF6" />,
};

export default function ViewSwitcher({ viewStyle, onChange }: Props) {
  return (
    <div className="absolute left-1 top-16 rounded-full bg-[var(--color-background)] p-1 border-2">
      <div className="relative flex space-x-1">
        <div
          className="absolute top-0 bottom-0 z-10 rounded-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            left: `${
              (Object.keys(viewIcons).indexOf(viewStyle) * 100) /
              Object.keys(viewIcons).length
            }%`,
            width: `${100 / Object.keys(viewIcons).length}%`,
          }}
        />
        {Object.entries(viewIcons).map(([key, icon]) => {
          return (
            <div
              key={key}
              className="flex p-2 rounded-full cursor-pointer z-20 px-2"
              onClick={() => onChange(key as ViewStyle)}
            >
              {icon}{" "}
              <span className="ml-2 text-sm ">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
