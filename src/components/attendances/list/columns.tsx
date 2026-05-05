'use client';

import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Attendance = {
  id: string;
  couple: string;
  group: string;
};

function ColumnHeaderButton({ column, label }: { column: Column<Attendance>, label: string }) {
  return (
    <Button
      variant="ghost"
      className="font-bold cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <ArrowUpDown />
    </Button>
  );
}

export const columns: Array<ColumnDef<Attendance>> = [
  {
    accessorKey: 'couple',
    header: ({ column }) => {
      return <ColumnHeaderButton column={column} label="Casal" />;
    },
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return <ColumnHeaderButton column={column} label="Círculo" />;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Registrar Presença',
    cell: ({ row }) => {
      const attendance = row.original;

      return (
        <Button
          className="cursor-pointer font-bold"
          onClick={() => console.log(`=> Selected: ${attendance.couple}`)}
        >
          <ClipboardCheck />
          Registrar
        </Button>
      );
    },
  },
];
