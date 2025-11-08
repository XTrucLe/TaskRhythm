import React from "react";
import { type TaskColumn } from "../../../../types/taskColumn";
import { TableHead, TableRow, TableCell } from "@mui/material";

type TableHeaderProps = {
  columns: TaskColumn[];
};

function TableHeader({ columns }: TableHeaderProps) {
  return (
    <TableHead
      sx={{
        backgroundColor: "grey.300",
        height: 56,
        "& .MuiTableCell-head": { padding: "0 4px" },
      }}
    >
      <TableRow sx={{ backgroundColor: "inherit" }}>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            sx={{
              fontSize: 18,
              fontWeight: 600,
              bgcolor: "inherit",
              paddingLeft: column.key === "name" ? "42px !important" : "auto",
            }}
            style={{
              position: column.key === "name" ? "sticky" : "static",
              left: column.key === "name" ? 0 : "auto",
              zIndex: column.key === "name" ? 20 : "auto",
              width: column.width ? column.width : 180,
              whiteSpace: "nowrap",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default React.memo(TableHeader);
