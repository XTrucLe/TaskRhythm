import React, { useState, memo } from "react";
import { Box, TableCell } from "@mui/material";
import type { Task } from "../../../../types/task";
import type { TaskColumn } from "../../../../types/taskColumn";
import type { UserBase } from "../../../../types/user";
import { AllUsers } from "../../../../mock/tasks";

import { StatusCell } from "../../TaskStatus";
import { PriorityCell } from "../../TaskPriorities";
import AssigneeCell from "./AssigneeCell";
import DateCell from "./DateCell";
import ExpandCell from "./ExpandCell";
import TextCell from "./TextCell";
import ToolBox from "../layout/ToolBox";
import { formatDate } from "../../../../utils/date.helper";

type OnChangeValue = string | UserBase[] | Date;

interface CellFactoryProps {
  task: Task;
  columnKey: TaskColumn["key"];
  editing?: boolean;
  onChange: (value: OnChangeValue) => void;
  expanded?: boolean;
  toggleExpanded?: () => void;
  onAddSubTask?: (id: string, level: number) => void;
  onClick?: () => void;
}

interface CellRendererProps extends CellFactoryProps {
  onBlur?: () => void;
}

const NameCell: React.FC<CellRendererProps> = ({
  task,
  onChange,
  expanded,
  toggleExpanded,
  onAddSubTask,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => onAddSubTask?.(task.id, (task.level ?? 0) + 1);
  const handleBlur = () => setIsEditing(false);

  return (
    <Box
      className="flex items-center gap-1"
      sx={{
        pl: (task.level ?? 0) * 2 + (task.subTasks?.length ? 0 : 3),
        "&:hover .table-toolbox": { display: isEditing ? "none" : "flex" },
      }}
    >
      {task.subTasks?.length ? (
        <ExpandCell expanded={!!expanded} toggleExpanded={toggleExpanded} />
      ) : null}

      <TextCell
        value={task.name}
        onChange={(v) => onChange(v)}
        editing={isEditing}
        onBlur={handleBlur}
        onClick={onClick}
      />

      <ToolBox
        hide={task.level === 2 ? ["add"] : []}
        onAdd={handleAdd}
        onEdit={() => setIsEditing(true)}
      />
    </Box>
  );
};

const cellRenderers: Record<
  TaskColumn["key"],
  React.FC<CellRendererProps> | undefined
> = {
  name: NameCell,
  dueDate: ({ task, onChange, editing, onBlur }) => (
    <DateCell
      value={formatDate(task.dueDate)}
      onChange={onChange}
      editing={editing}
      onBlur={onBlur}
    />
  ),
  assignee: ({ task, editing, onBlur }) => (
    <AssigneeCell
      allUsers={AllUsers}
      value={task.assignee}
      editing={task.subTasks ? false : editing}
      onBlur={onBlur}
    />
  ),
  status: ({ task }) => <StatusCell status={task.status} />,
  priority: ({ task }) => <PriorityCell priority={task.priority} />,
  description: ({ task, onChange, editing }) => (
    <TextCell
      value={task.description ?? "-"}
      onChange={(v) => onChange(v)}
      editing={editing}
    />
  ),
  progress: ({ task, onChange }) => (
    <TextCell
      value={task.progress?.toString() ?? "-"}
      onChange={(v) => onChange(v)}
    />
  ),
  type: ({ task, onChange, editing }) => (
    <TextCell
      value={task.type ?? ""}
      onChange={(v) => onChange(v)}
      editing={editing}
    />
  ),
  actualStartDate: ({ task, onChange, editing, onBlur }) => (
    <DateCell
      value={formatDate(task.actualStartDate)}
      onChange={onChange}
      editing={editing}
      onBlur={onBlur}
    />
  ),
  startDate: ({ task, onChange }) => (
    <DateCell
      value={formatDate(task.startDate)}
      onChange={onChange}
      editing={false}
    />
  ),
  completedDate: ({ task, onChange }) => (
    <DateCell
      value={formatDate(task.completedDate)}
      onChange={onChange}
      editing={false}
    />
  ),
  estimatedHours: ({ task, onChange, editing }) => (
    <TextCell
      value={task.estimatedHours?.toString() ?? "-"}
      onChange={(v) => onChange(v)}
      editing={editing}
    />
  ),
  loggedHours: ({ task }) => (
    <TextCell value={task.loggedHours?.toString() ?? "-"} />
  ),
};

const CellFactory: React.FC<CellFactoryProps> = (props) => {
  const { columnKey } = props;
  const CellComponent = cellRenderers[columnKey];

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
      {CellComponent ? <CellComponent {...props} /> : <span>—</span>}
    </TableCell>
  );
};

export default memo(CellFactory);
