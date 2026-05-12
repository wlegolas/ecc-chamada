'use client';

import { getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useCallback } from 'react';
import { DataTable } from '@/components/table';
import { type Attendance, type DataTableOptions, useAttendancesTable } from '@/hooks';
import { AttendancesConfirmDialog } from './attendance-confirm-dialog';
import { SearchAttendances } from './search-attendances';
import { AttendancesConfirmDialogContent } from './attendance-confirm-dialog-content';

interface AttendancesTableProps {
  data: Array<Attendance>;
}

export function AttendancesTable({ data }: AttendancesTableProps) {
  const { columns, table, selectedAttendance, clearSelectedAttendance } = useAttendancesTable({ data });
  const tableOptions: DataTableOptions<Attendance> = {
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'couple',
          desc: false,
        },
      ],
    },
  };

  const handleSearch = useCallback(
    (value: string) => {
      table.setGlobalFilter(String(value));
    },
    [table],
  );

  const handleConfirmDialogCancel = () => {
    clearSelectedAttendance();
  };

  const handleConfirmDialogConfirm = () => {
    clearSelectedAttendance();
  };

  return (
    <div className="flex flex-col gap-2">
      <SearchAttendances onSearch={handleSearch} />
      {selectedAttendance && (
        <AttendancesConfirmDialog
          attendance={selectedAttendance}
          onCancel={handleConfirmDialogCancel}
          onConfirm={handleConfirmDialogConfirm}
        />
      )}
      {/* <AttendancesConfirmForm /> */}
      <DataTable
        columns={columns}
        data={data}
        tableOptions={tableOptions}
      />
    </div>
  );
}
