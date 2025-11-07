import { useContext } from "react";
import {
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  Paper,
} from "@mui/material";
// import TaskTableRow from "./../table/TaskTableRow";
import { TaskContext } from "../../../contexts/TaskContext";
import TaskTable from "../table-x";
import { defaultColumns } from "../table-x/types/columns";

type TaskTableViewProps = {
  expanded: string[];
  setExpanded: (expanded: string[]) => void;
};

export default function TaskTableView({
  expanded,
  setExpanded,
}: TaskTableViewProps) {
  const { tasks } = useContext(TaskContext);

  return (
    <Paper elevation={2} sx={{ margin: 2 }}>
      <TaskTable
        columns={defaultColumns}
        tasks={tasks}
        expanded={expanded}
        setExpanded={setExpanded}
        onStatusChange={() => {}}
      />
    </Paper>
  );
}
