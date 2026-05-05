'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Attendance = {
  id: string;
  couple: string;
  group: string;
};

export const columns: Array<ColumnDef<Attendance>> = [
  {
    accessorKey: 'couple',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Casal
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Círculo
          <ArrowUpDown />
        </Button>
      );
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
