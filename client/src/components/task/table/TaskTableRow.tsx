import { Fragment, useState } from "react";
import type { Task } from "../../../types/task";
import { TableCell, TableRow } from "@mui/material";
import { StatusCell, StatusDropdown } from "../TaskStatus";
import TaskTableNameCell from "./TaskTableNameCell";

type TaskTableRowProps = {
  task: Task;
  level?: number;
  expanded: string[];
  toggleExpand: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
};

export default function TaskTableRow({
  task,
  level = 0,
  expanded,
  toggleExpand,
  onStatusChange,
}: TaskTableRowProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [tempRowData, setTempRowData] = useState<Partial<Task> | null>(null);

  const handleAddSubTask = (parentId: string, currentLevel = 0) => {
    setTempRowData({ ...tempRowData, parentId, level: currentLevel + 1 });
    // You might want to expand the parent task if it's not already
    if (!expanded.includes(parentId)) {
      toggleExpand(parentId);
    }
  };

  const handleNameSave = (taskId: string, newName: string) => {
    console.log(`Task ID: ${taskId}, New Name: ${newName}`);
    setEditing(null);
    // Call API to update task name here
  };

  const isExpanded = expanded.includes(task.id);

  return (
    <Fragment>
      <TableRow
        key={task.id}
        sx={{
          height: 36,
          "&:last-child td": { borderBottom: 0 },
          "&:hover": { backgroundColor: "grey.50" },
        }}
      >
        <TaskTableNameCell
          task={task}
          level={level}
          isExpanded={isExpanded}
          isEditing={editing === task.id}
          onToggleExpand={() => toggleExpand(task.id)}
          onEdit={() => setEditing(task.id)}
          onAddSubTask={() => handleAddSubTask(task.id, task.level)}
          onSave={handleNameSave}
        />

        <TableCell>{task.assignee?.join(", ") || "-"}</TableCell>

        <TableCell>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("vi-VN")
            : "-"}
        </TableCell>

        <TableCell>
          {task.level === 2 ? (
            <StatusDropdown
              status={task.status}
              onchange={(newStatus) => onStatusChange(task.id, newStatus)}
            />
          ) : (
            <StatusCell status={task.status} />
          )}
        </TableCell>
      </TableRow>

      {/* Render sub-tasks recursively */}
      {isExpanded &&
        task.subTasks?.map((subtask) => (
          <TaskTableRow
            key={subtask.id}
            task={subtask}
            level={level + 1}
            expanded={expanded}
            toggleExpand={toggleExpand}
            onStatusChange={onStatusChange}
          />
        ))}

      {/* Render temporary row for new sub-task */}
      {tempRowData && tempRowData.parentId === task.id && (
        <TableRow sx={{ height: 36 }}>
          <TaskTableNameCell
            task={tempRowData as Task}
            level={level + 1}
            isExpanded={false}
            isEditing={true}
            onSave={(taskId, newName) => {
              console.log("Saving new sub-task:", {
                parentId: taskId,
                name: newName,
              });
              setTempRowData(null);
            }}
          />
          <TableCell>{/* Placeholder for new task assignee */}</TableCell>
          <TableCell>{/* Placeholder for new task due date */}</TableCell>
          <TableCell>{/* Placeholder for new task status */}</TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
