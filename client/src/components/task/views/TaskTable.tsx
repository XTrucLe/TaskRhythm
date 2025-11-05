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
import TaskTable from "../table-x/TaskTable";
import { defaultColumns } from "../table-x/ColumnDef";

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
{
  /* <TableContainer
        component={Paper}
        sx={{
          maxHeight: "80vh",
          overflow: "auto",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{ tableLayout: "fixed", overflowX: "scroll" }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              <TableCell
                sx={{
                  zIndex: 20,
                  fontWeight: 600,
                  bgcolor: "inherit",
                  width: 320,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  bgcolor: "inherit",
                  width: 150,
                }}
              >
                Assignee
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, bgcolor: "inherit", width: 150 }}
              >
                Due Date
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, bgcolor: "inherit", width: 150 }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Replace the following with actual task data mapping */
}
//       {tasks.map((task) => (
//         <TaskTableRow
//           key={task.id}
//           task={task}
//           expanded={expanded}
//           toggleExpand={(id) => {
//             if (expanded.includes(id)) {
//               setExpanded(expanded.filter((x) => x !== id));
//             } else {
//               setExpanded([...expanded, id]);
//             }
//           }}
//           onStatusChange={(id, status) => {
//             console.log(`Task ID: ${id}, New Status: ${status}`);
//           }}
//         />
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer> */}
