import React from "react";
import type { Task } from "../../../../types/task";
import type { ColumnDef } from "../ColumnDef";
import type { UserBase } from "../../../../types/user";
import TextCell from "./TextCell";
import DateCell from "./DateCell";
import AssigneeCell from "./AssigneeCell";
import { AllUsers } from "../../../../mock/tasks";
import { Box, TableCell } from "@mui/material";
import ExpandCell from "./ExpandCell";
import { StatusCell } from "../../TaskStatus";
import { PriorityCell } from "../../TaskPriorities";

type CellFactoryProps = {
  task: Task;
  columnKey: ColumnDef["key"];
  editing?: boolean;
  onChange: (value: string | UserBase[] | Date) => void;
  expanded?: boolean;
  toggleExpanded?: () => void;
};

function CellFactory({
  task,
  columnKey,
  editing,
  onChange,
  expanded,
  toggleExpanded,
}: CellFactoryProps) {
  const onBlur = () => {
    // Placeholder for onBlur logic if needed
  };
  const renderCell = () => {
    switch (columnKey) {
      case "name":
        return (
          <Box
            className="flex items-center gap-1"
            sx={{ pl: (task.level ?? 0) * 2 + (task.subTasks?.length ? 0 : 3) }}
          >
            {task.subTasks && task.subTasks.length > 0 && (
              <ExpandCell
                expanded={expanded || false}
                toggleExpanded={toggleExpanded}
              />
            )}
            <TextCell value={task.name} onChange={onChange} editing={editing} />
          </Box>
        );
      case "dueDate":
        return (
          <DateCell
            value={new Date(task.dueDate || "").toISOString().split("T")[0]}
            onChange={onChange}
            editing={editing}
            onBlur={onBlur}
          />
        );
      case "assignee":
        return (
          <AssigneeCell
            value={task.assignee}
            onChange={onChange}
            editing={editing}
            onBlur={onBlur}
            allUsers={AllUsers}
          />
        );
      case "status":
        return <StatusCell status={task.status} />;
      case "priority":
        return <PriorityCell priority={task.priority} />;
      default:
        return <span>—</span>;
    }
  };

  return (
    <TableCell sx={{ textOverflow: "ellipsis" }}>{renderCell()}</TableCell>
  );
}

export default React.memo(CellFactory);
