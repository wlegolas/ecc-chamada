'use client';

import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export type DataTableOptions<TData> = Omit<
  Parameters<typeof useReactTable<TData>>[0],
  'data' | 'columns' | 'getCoreRowModel'
>;

export interface UseDataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
  tableOptions?: DataTableOptions<TData>;
}

export interface UseDataTableResult<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

export function useDataTable<TData, TValue>({
  columns,
  data,
  tableOptions = {},
}: UseDataTableProps<TData, TValue>): UseDataTableResult<TData> {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return { table };
}
