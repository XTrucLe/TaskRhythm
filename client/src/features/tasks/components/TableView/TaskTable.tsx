import { useState } from "react";
import { Paper } from "@mui/material";
import { Table, TableContainer, TableBody } from "@mui/material";
import TableHeader from "../../temp/layout/TableHeader";
import TaskRow from "../../temp/layout/TaskRow";
import { useTaskStore } from "../../stores/task.store";
import type { Task } from "../../types/task";
import { useTaskColumnStore } from "../../stores/taskColumn.store";

export default function TaskTableView() {
  const { tasks, toggleExpanded, expanded, addSubTask, setSelectedTask } =
    useTaskStore();
  const [newRow, setNewRow] = useState<{
    parentId: string;
    level: number;
  } | null>(null);
  const { columns } = useTaskColumnStore();

  const handleAddSubTask = (parentId: string, level: number) => {
    setNewRow({ parentId, level });
    if (toggleExpanded && expanded && !expanded.includes(parentId)) {
      toggleExpanded(parentId);
    }
  };

  const handleSaveNewTask = (newTask: Omit<Task, "id">) => {
    if (newRow) {
      // Save the new task
      addSubTask(newRow.parentId, { ...newTask, id: Date.now().toString() });
      // You can use your task store or any other method to save the task
      console.log("Saving new task:", newTask);
      // After saving, you might want to reset the newRow state
      setNewRow(null);
    }
  };

  const handleCancelNewTask = () => {
    setNewRow(null);
  };

  const addingRow = newRow;

  const onStatusChange = (id: string, status: string) => {
    // Handle status change logic here
    console.log(`Task ${id} status changed to ${status}`);
  };

  return (
    <Paper elevation={2} sx={{ position: "relative", margin: 2 }}>
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
                toggleExpanded={toggleExpanded}
                onStatusChange={onStatusChange}
                onAddSubTask={handleAddSubTask}
                addingRow={addingRow}
                onSaveRow={handleSaveNewTask}
                onCancelRow={handleCancelNewTask}
                openDetail={setSelectedTask}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
