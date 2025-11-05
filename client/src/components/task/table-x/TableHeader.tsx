import React from "react";
import { type ColumnDef } from "./ColumnDef";
import { TableHead, TableRow, TableCell } from "@mui/material";

type TableHeaderProps = {
  columns: ColumnDef[];
};

function TableHeader({ columns }: TableHeaderProps) {
  return (
    <TableHead sx={{ backgroundColor: "grey.100", height: 56 }}>
      <TableRow sx={{ backgroundColor: "inherit" }}>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            sx={{
              fontSize: 18,
              fontWeight: 600,
              bgcolor: "inherit",
              width: column.width,
              paddingLeft: column.key === "name" ? 6 : 1,
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
