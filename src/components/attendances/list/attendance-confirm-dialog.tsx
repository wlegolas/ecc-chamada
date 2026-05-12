import { ClipboardCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Attendance } from '@/hooks';
import { AttendancesConfirmDialogContent } from './attendance-confirm-dialog-content';

interface AttendancesConfirmDialogProps {
  attendance: Attendance;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AttendancesConfirmDialog({ attendance, onCancel, onConfirm }: AttendancesConfirmDialogProps) {
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      onCancel();
    }
  };

  return (
    <Dialog
      open
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className="sm:max-w-sm"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <ClipboardCheck /> Confirmar Presença
          </DialogTitle>
          <DialogDescription>
            Verifique se os dados abaixo estão corretos para confirmar a presença do casal.
          </DialogDescription>
        </DialogHeader>
        <AttendancesConfirmDialogContent
          attendance={attendance}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
}
