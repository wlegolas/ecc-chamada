'use client';

import { CircleDashed, Loader, UsersRound } from 'lucide-react';
import { type PropsWithChildren, useActionState, useEffect } from 'react';
import { registerAttendance } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import type { Attendance } from '@/hooks';

interface AttendancesConfirmFormProps extends PropsWithChildren {
  attendance: Attendance;
  onConfirm: () => void;
}

type SubmitFormResult = {
  success: boolean;
  message: string;
};

async function submitForm(_prevState: SubmitFormResult, formData: FormData) {
  await registerAttendance(formData);

  return { success: true, message: 'Form submitted successfully!' };
}

const initialState: SubmitFormResult = {
  success: false,
  message: '',
};

export function AttendancesConfirmDialogContent({ attendance, onConfirm, children }: AttendancesConfirmFormProps) {
  const [state, formAction, isPending] = useActionState(submitForm, initialState);

  useEffect(() => {
    if (state.success) {
      onConfirm();
    }
  }, [state.success, onConfirm]);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="couple"
        value={attendance.couple}
      />
      <input
        type="hidden"
        name="group"
        value={attendance.group}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col bg-gray-200 p-2 rounded-md border">
          <div className="flex gap-1 items-center text-primary">
            <UsersRound size="16" />
            <span className="text-sm font-bold">Casal</span>
          </div>
          <span className="truncate">{attendance.couple}</span>
        </div>
        <div className="flex flex-col bg-gray-200 p-2 rounded-md border">
          <div className="flex gap-1 items-center text-primary">
            <CircleDashed size="16" />
            <span className="text-sm font-bold">Círculo</span>
          </div>
          <span className="truncate">{attendance.group}</span>
        </div>
      </div>
      <DialogFooter className="mt-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="cursor-pointer"
        >
          {isPending && <Loader className="animate-spin" />}
          Confirmar
        </Button>
      </DialogFooter>
      {children}
    </form>
  );
}
