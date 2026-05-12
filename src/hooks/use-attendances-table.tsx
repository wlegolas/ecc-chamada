'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ClipboardCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ColumnHeaderButton } from '@/components/table';
import { Button } from '@/components/ui/button';
import { type UseDataTableResult, useDataTable } from './use-data-table';

export type Attendance = {
  id: string;
  couple: string;
  group: string;
};

interface UseAttendancesTableProps {
  data: Array<Attendance>;
}

interface UseAttendancesTableResult extends UseDataTableResult<Attendance> {
  columns: Array<ColumnDef<Attendance>>;
  selectedAttendance?: Attendance;
  clearSelectedAttendance: (attendance?: Attendance) => void;
}

export function useAttendancesTable({ data }: UseAttendancesTableProps): UseAttendancesTableResult {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | undefined>(undefined);
  const columns: Array<ColumnDef<Attendance>> = [
    {
      accessorKey: 'couple',
      header: ({ column }) => {
        return (
          <ColumnHeaderButton
            column={column}
            label="Casal"
          />
        );
      },
    },
    {
      accessorKey: 'group',
      header: ({ column }) => {
        return (
          <ColumnHeaderButton
            column={column}
            label="Círculo"
          />
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
            onClick={() => {
              console.log(`=> Selected: ${attendance.couple}`);
              setSelectedAttendance(attendance);
            }}
          >
            <ClipboardCheck />
            Registrar
          </Button>
        );
      },
    },
  ];
  const clearSelectedAttendance = useCallback(() => {
    setSelectedAttendance(undefined);
  }, []);
  const { table } = useDataTable({ columns, data });

  return { columns, selectedAttendance, clearSelectedAttendance, table };
}
