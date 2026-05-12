'use client';

import { useCallback } from 'react';
import type { Attendance } from '@/app/actions';
import { DataTable } from '@/components/table';
import { useAttendancesTable } from '@/hooks';
import { AttendancesConfirmDialog } from './attendance-confirm-dialog';
import { SearchAttendances } from './search-attendances';

interface AttendancesTableProps {
  data: Array<Attendance>;
}

export function AttendancesTable({ data }: AttendancesTableProps) {
  const { table, selectedAttendance, clearSelectedAttendance } = useAttendancesTable({ data });

  const handleSearch = useCallback(
    (value: string) => {
      table.setGlobalFilter(String(value));
    },
    [table],
  );

  const handleDialogActions = useCallback(() => {
    clearSelectedAttendance();
  }, [clearSelectedAttendance]);

  return (
    <div className="flex flex-col gap-2">
      <SearchAttendances onSearch={handleSearch} />
      {selectedAttendance && (
        <AttendancesConfirmDialog
          attendance={selectedAttendance}
          onCancel={handleDialogActions}
          onConfirm={handleDialogActions}
        />
      )}
      <DataTable table={table} />
    </div>
  );
}
