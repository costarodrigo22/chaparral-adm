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
  onClose: () => void;
}

export default function ModalConfirm({ open, onClose }: IModalConfirm) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[480px]">
        <DialogHeader>
          <DialogTitle>Deseja continuar?</DialogTitle>
          <DialogDescription>
            Após o reset da senha, ela será redefinida para o e-mail do usuário.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-4">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button>Continuar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
