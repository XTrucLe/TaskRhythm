import React from "react";
import { Box, TableCell } from "@mui/material";
import type { Task } from "../../../../types/task";
import type { ColumnDef } from "../types/columns";
import type { UserBase } from "../../../../types/user";
import { AllUsers } from "../../../../mock/tasks";
import { StatusCell } from "../../TaskStatus";
import { PriorityCell } from "../../TaskPriorities";
import AssigneeCell from "./AssigneeCell";
import DateCell from "./DateCell";
import ExpandCell from "./ExpandCell";
import TextCell from "./TextCell";
import ToolBox from "../layout/ToolBox";

type CellFactoryProps = {
  task: Task;
  columnKey: ColumnDef["key"];
  editing?: boolean;
  onChange: (value: string | UserBase[] | Date) => void;
  expanded?: boolean;
  toggleExpanded?: () => void;
  onAddSubTask?: (id: string, level: number) => void;
};

type CellRendererProps = CellFactoryProps & {
  onBlur?: () => void;
};

const NameCell: React.FC<CellRendererProps> = ({
  task,
  onChange,
  expanded,
  toggleExpanded,
  onAddSubTask,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const onAdd = () => {
    if (onAddSubTask) {
      onAddSubTask(task.id, (task.level || 0) + 1);
    }
  };

  return (
    <Box
      className="flex items-center gap-1"
      sx={{
        pl: (task.level ?? 0) * 2 + (task.subTasks?.length ? 0 : 3),
        "&:hover .table-toolbox": {
          display: "flex",
        },
      }}
    >
      {task.subTasks && task.subTasks.length > 0 && (
        <ExpandCell
          expanded={expanded || false}
          toggleExpanded={toggleExpanded}
        />
      )}
      <TextCell
        value={task.name}
        onChange={onChange as (value: string) => void}
        editing={isEditing}
      />
      <ToolBox
        hide={task.level === 2 ? ["add"] : []}
        onAdd={onAdd}
        onEdit={() => setIsEditing(true)}
      />
    </Box>
  );
};

const cellRenderers: Partial<
  Record<ColumnDef["key"], React.FC<CellRendererProps>>
> = {
  name: NameCell,
  dueDate: ({ task, onChange, editing, onBlur }) => (
    <DateCell
      value={new Date(task.dueDate || "").toISOString().split("T")[0]}
      onChange={onChange}
      editing={editing}
      onBlur={onBlur}
    />
  ),
  assignee: ({ task, onChange, editing, onBlur }) => (
    <AssigneeCell
      value={task.assignee}
      onChange={onChange as (value: UserBase[]) => void}
      editing={editing}
      onBlur={onBlur}
      allUsers={AllUsers}
    />
  ),
  status: ({ task }) => <StatusCell status={task.status} />,
  priority: ({ task }) => <PriorityCell priority={task.priority} />,
  description: ({ task, onChange, editing }) => (
    <TextCell
      value={task.description || ""}
      onChange={onChange as (value: string) => void}
      editing={editing}
    />
  ),
  progress: ({ task, onChange }) => (
    <TextCell
      value={task.progress?.toString() || ""}
      onChange={onChange as (value: string) => void}
    />
  ),
  type: ({ task, onChange, editing }) => (
    <TextCell
      value={task.type || ""}
      onChange={onChange as (value: string) => void}
      editing={editing}
    />
  ),
  actualStartDate: ({ task, onChange, editing, onBlur }) => (
    <DateCell
      value={new Date(task.actualStartDate || "").toISOString().split("T")[0]}
      onChange={onChange}
      editing={editing}
      onBlur={onBlur}
    />
  ),
  startDate: ({ task, onChange, onBlur }) => (
    <DateCell
      value={new Date(task.startDate || "").toISOString().split("T")[0]}
      onChange={onChange}
      editing={false}
      onBlur={onBlur}
    />
  ),
  completedDate: ({ task, onChange, onBlur }) => (
    <DateCell
      value={new Date(task.completedDate || "").toISOString().split("T")[0]}
      onChange={onChange}
      editing={false}
      onBlur={onBlur}
    />
  ),
  estimatedHours: ({ task, onChange, editing, onBlur }) => (
    <TextCell
      value={task.estimatedHours?.toString() || ""}
      onChange={onChange as (value: string) => void}
      editing={editing}
      onBlur={onBlur}
    />
  ),
  loggedHours: ({ task, onBlur }) => (
    <TextCell value={task.loggedHours?.toString() || ""} onBlur={onBlur} />
  ),
};

function CellFactory(props: CellFactoryProps) {
  const { columnKey } = props;
  const onBlur = () => {
    // Placeholder for onBlur logic if needed
  };

  const CellComponent = cellRenderers[columnKey];

  const renderCell = () => {
    if (CellComponent) {
      return <CellComponent {...props} onBlur={onBlur} />;
    }
    return <span>—</span>;
  };

  return (
    <TableCell
      sx={{
        textOverflow: "ellipsis",
        position: columnKey === "name" ? "sticky" : "static",
        left: columnKey === "name" ? 0 : "auto",
        zIndex: columnKey === "name" ? 10 : "auto",
        bgcolor: columnKey === "name" ? "background.paper" : "inherit",
      }}
    >
      {renderCell()}
    </TableCell>
  );
}

export default React.memo(CellFactory);
