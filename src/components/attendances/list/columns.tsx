'use client';

import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { FieldGroup } from '@/components/ui/field';

export type Attendance = {
  id: string;
  couple: string;
  group: string;
};

function ColumnHeaderButton({ column, label }: { column: Column<Attendance>; label: string }) {
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

export function DialogDemo({ attendance }: { attendance: Attendance }) {
  return (
    <Dialog>
      <form className="test-form">
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer font-bold"
            onClick={() => console.log(`=> Selected: ${attendance.couple}`)}
          >
            <ClipboardCheck />
            Registrar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              <ClipboardCheck /> Confirmar Presença
            </DialogTitle>
            <DialogDescription>
              Verifique se os dados abaixo estão corretos para confirmar a presença do casal.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="couple">Casal</FieldLabel>
              <Input
                id="couple"
                readOnly
                value={attendance.couple}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="group">Círiculo</FieldLabel>
              <Input
                id="group"
                readOnly
                value={attendance.group}
              />
            </Field>
          </FieldGroup>
          <Input
            type="hidden"
            id="id"
            name="id"
            value={attendance.id}
          />
          <div>
            <span>Casal:</span>
            <span>{attendance.couple}</span>
          </div>
          <div>
            <span>Grupo:</span>
            <span>{attendance.group}</span>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function ConfirmAttendanceAction({ attendance }: { attendance: Attendance }) {
  return (
    <Button
      className="cursor-pointer font-bold"
      onClick={() => console.log(`=> Selected: ${attendance.couple}`)}
    >
      <ClipboardCheck />
      Registrar
    </Button>
  );
}

export const columns: Array<ColumnDef<Attendance>> = [
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

      return <DialogDemo attendance={attendance} />;
    },
  },
];
