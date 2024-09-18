import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ModalConfirm from '@/components/ModalConfirm';
import { useState } from 'react';

interface IModalAddUsers {
  open: boolean;
  onClose: () => void;
}

export default function ModalEditUsers({ open, onClose }: IModalAddUsers) {
  const [modalEdit, setModalEdit] = useState(false);

  return (
    <>
      <ModalConfirm open={modalEdit} onClose={() => setModalEdit(false)} />

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
            <DialogDescription>
              Preencha as informações de edição
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Info size={18} stroke="#08964F" />

            <span className="text-sm font-medium">Informações Gerais</span>
          </div>

          <Separator />

          <form className="flex flex-col gap-1">
            <Label htmlFor="name" className="font-medium text-sm">
              Nome
            </Label>
            <Input id="name" placeholder="Nome" className="mb-3" />
            <Label htmlFor="email" className="font-medium text-sm">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="Digite seu e-mail"
              className="mb-3"
            />
            <Label htmlFor="type-profile" className="font-medium text-sm">
              Tipo de perfil
            </Label>
            <Select>
              <SelectTrigger className="" id="type-profile">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 mt-4">
              <ShieldCheck size={18} stroke="#08964F" />

              <span className="text-sm font-medium">Segurança</span>
            </div>
            <Separator />
            <Label htmlFor="password" className="font-medium text-sm mt-4">
              Senha
            </Label>
            <Input
              disabled
              id="password"
              placeholder="******"
              className="mb-1"
            />

            <div className="flex justify-end mb-1">
              <span
                onClick={() => setModalEdit(true)}
                className="underline text-sm cursor-pointer font-medium"
              >
                Resetar senha
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline">Cancelar</Button>

              <Button>Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
