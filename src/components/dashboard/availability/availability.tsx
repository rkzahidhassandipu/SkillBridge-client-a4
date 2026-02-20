"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddAvailabilityDialog from "./AddAvailabilityDialog";
import { getAllAvailability } from "@/actions/availability.actions";

type Availability = {
  day: string;
  time: string;
  status: string;
};

interface BadgeProps {
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "success";
  children: React.ReactNode;
}


const columns: ColumnDef<Availability>[] = [
  {
    accessorKey: "day",
    header: "Day",
    cell: ({ row }) => <span className="font-medium">{row.original.day}</span>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <span>{row.original.time}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="default">{row.original.status}</Badge>

    ),
  },
];

export default function AvailabilityPanel() {
  const queryClient = useQueryClient();

  // Fetch availability slots using TanStack Query
  const { data, isLoading, error } = useQuery({
  queryKey: ["availability"],
  queryFn: async () => {
    const res = await getAllAvailability();

    // Throw error only if res.error exists
    if (res && "success" in res && !res.success) {
      throw new Error((res as any).message || "Something went wrong");
    }

    // Ensure always array
    const slots = res.data?.data ?? [];

    return slots.map((slot: any) => ({
      day: slot.day,
      time: `${slot.startTime} - ${slot.endTime}`,
      status: "Available",
    })) as Availability[];
  },
});



  const handleSuccess = (slot: { day: string; startTime: string; endTime: string }) => {
    // Optimistically update cache
    queryClient.setQueryData<Availability[]>(["availability"], (old) => [
      ...(old || []),
      {
        day: slot.day,
        time: `${slot.startTime} - ${slot.endTime}`,
        status: "Available",
      },
    ]);
  };

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading availability...</p>;
  if (error) return <p className="text-red-500">Failed to load availability</p>;

  return (
    <Card className="border-purple-500">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-purple-600" />
          <CardTitle>Availability</CardTitle>
        </div>
        <AddAvailabilityDialog onSuccess={handleSuccess} />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="text-left border-b">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-2 px-3 text-sm font-semibold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-2 px-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
