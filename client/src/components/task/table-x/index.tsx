import { useState } from "react";
import type { Task } from "../../../types/task";
import type { ColumnDef } from "./types/columns";
import TableHeader from "./layout/TableHeader";
import TaskRow from "./layout/TaskRow";
import { Table, TableContainer, TableBody } from "@mui/material";

type TaskTableProps = {
  columns: ColumnDef[];
  tasks: Task[];
  expanded?: string[];
  setExpanded?: (expanded: string[]) => void;
  onStatusChange?: (id: string, status: string) => void;
};

function TaskTable({
  columns,
  tasks,
  expanded,
  setExpanded,
  onStatusChange,
}: TaskTableProps) {
  const [addingRow, setAddingRow] = useState<{
    parentId: string;
    level: number;
  } | null>(null);

  const handleAddSubTask = (parentId: string, level: number) => {
    console.log("Handle adding task: ", parentId, level);

    setAddingRow({ parentId, level });
    if (setExpanded && expanded && !expanded.includes(parentId)) {
      setExpanded([...expanded, parentId]);
    }
  };

  const handleSaveNewTask = (newTask: Omit<Task, "id">) => {
    console.log("Saving new task:", {
      ...newTask,
      parentId: addingRow?.parentId,
    });
    // Here you would typically call an API to save the new task
    // and then update the local state to reflect the change.
    setAddingRow(null);
  };

  const handleCancelNewTask = () => {
    setAddingRow(null);
  };

  return (
    <TableContainer>
      <Table
        stickyHeader
        size="small"
        sx={{
          tableLayout: "fixed",
          overflowX: "scroll",
        }}
      >
        <TableHeader columns={columns} />
        <TableBody
          sx={{
            "& .MuiTableCell-body": {
              padding: "8px !important",
              height: "40px !important",
            },
            "& .MuiInputBase-input": {
              padding: "2px 4px !important",
            },
          }}
        >
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              columns={columns}
              task={task}
              expanded={expanded}
              setExpanded={setExpanded}
              onStatusChange={onStatusChange}
              onAddSubTask={handleAddSubTask}
              addingRow={addingRow}
              onSaveRow={handleSaveNewTask}
              onCancelRow={handleCancelNewTask}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
