import type { Task } from "../../../types/task";
import type { ColumnDef } from "./ColumnDef";
import TableHeader from "./TableHeader";
import TaskRow from "./TaskRow";
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
            "& .MuiTableCell-root": {
              padding: "8px 12px !important",
              height: 48,
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
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
