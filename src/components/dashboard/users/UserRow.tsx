"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { User, UserRowProps } from "@/types/index";
import UserRowActions from "./UserRowActions";

export default function UserRow({ row, onUpdateUser }: UserRowProps) {
  const user: User = row.original;

  return (
    <TableRow className="hover:bg-gray-50">
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {cell.column.id === "actions" ? (
            <UserRowActions user={user} onUpdateUser={onUpdateUser} />
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}