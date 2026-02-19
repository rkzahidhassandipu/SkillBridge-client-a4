"use client";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User, UsersTableProps } from "@/types/index";
import SearchFilter from "./SearchFilter";
import UserRow from "./UserRow";

export default function UsersTableClient({ initialUsers }: UsersTableProps) {
  const [data, setData] = React.useState<User[]>(initialUsers);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "NAME" },
    { accessorKey: "email", header: "EMAIL" },
    { accessorKey: "role", header: "ROLE" },
    { accessorKey: "status", header: "STATUS" },
    {
      accessorKey: "createdAt",
      header: "JOIN DATE",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: () => null, // Rendered in UserRow component
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = (filterValue as string).toLowerCase();
      const name = String(row.getValue("name") || "").toLowerCase();
      const email = String(row.getValue("email") || "").toLowerCase();
      const role = String(row.getValue("role") || "").toLowerCase();
      return name.includes(search) || email.includes(search) || role.includes(search);
    },
  });

  const handleUpdateUser = (userId: string, updated: Partial<User>) => {
    setData(prev => prev.map(u => u.id === userId ? { ...u, ...updated } : u));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchFilter value={globalFilter} onChange={setGlobalFilter} />
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-gray-50">
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="text-xs font-semibold text-gray-500 uppercase">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <UserRow
                  key={row.id}
                  row={row}
                  onUpdateUser={(updated) => handleUpdateUser(row.original.id, updated)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Showing {table.getFilteredRowModel().rows.length} of {data.length} users
      </div>
    </>
  );
}