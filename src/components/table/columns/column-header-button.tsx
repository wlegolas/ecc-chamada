'use client';

import type { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Attendance = {
  id: string;
  couple: string;
  group: string;
};

export function ColumnHeaderButton({ column, label }: { column: Column<Attendance>; label: string }) {
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
