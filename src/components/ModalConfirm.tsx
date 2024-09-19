import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

interface IModalConfirm {
  open: boolean;
  title: string;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
  onExecute?: () => void;
}

export default function ModalConfirm({
  open,
  title,
  description,
  isLoading,
  onClose,
  onExecute,
}: IModalConfirm) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-4">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button disabled={isLoading} onClick={onExecute}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
