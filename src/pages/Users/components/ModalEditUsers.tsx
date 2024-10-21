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
import { useEffect, useState } from 'react';
import { IUsersEdit } from '../useUsers';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/app/services/UsersService';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  profile_id: z.string().min(1, 'Tipo de perfil é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface IModalAddUsers {
  open: boolean;
  dataEdit: IUsersEdit | null;
  isLoading: boolean;
  onClose: () => void;
}

export default function ModalEditUsers({
  open,
  dataEdit,
  isLoading,
  onClose,
}: IModalAddUsers) {
  const [modalEdit, setModalEdit] = useState(false);

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      profile_id: '',
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: UsersService.updateUser,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        profile_id: data.profile_id,
        id: dataEdit?.id ?? '',
      });

      reset();

      onClose();

      toast.success('Usuário atualizado!');
    } catch {
      toast.error('Erro ao atualizar um usuário!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  async function handleResetPasswordUser() {
    try {
      await mutateAsync({
        name: dataEdit?.name,
        email: dataEdit?.email,
        profile_id: dataEdit?.profile?.id,
        password: dataEdit?.email,
        id: dataEdit?.id ?? '',
      });
    } catch {
      toast.error('Erro ao resetar senha do usuário!');
    } finally {
      setModalEdit(false);
    }
  }

  useEffect(() => {
    if (dataEdit) {
      reset({
        name: dataEdit.name,
        email: dataEdit.email,
        profile_id: dataEdit.profile?.id,
      });
    }
  }, [dataEdit, reset]);

  return (
    <>
      <ModalConfirm
        open={modalEdit}
        title="Deseja continuar?"
        description="Após o reset da senha, ela será redefinida para o e-mail do usuário."
        isLoading={isPending}
        onClose={() => setModalEdit(false)}
        onExecute={handleResetPasswordUser}
      />

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          {isLoading && (
            <>
              <DialogHeader>
                <DialogTitle>Editar usuário</DialogTitle>
                <DialogDescription>
                  Preencha as informações de edição
                </DialogDescription>
              </DialogHeader>

              <Skeleton className="h-[40px] rounded-md" />
              <Skeleton className="h-[40px] rounded-md" />
              <Skeleton className="h-[40px] rounded-md" />
              <Skeleton className="h-[40px] rounded-md" />
              <Skeleton className="h-[40px] rounded-md" />
            </>
          )}

          {!isLoading && (
            <>
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

              <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <div>
                  <Label htmlFor="name" className="font-medium text-sm">
                    Nome
                  </Label>
                  <Input
                    {...register('name')}
                    id="name"
                    placeholder="Nome"
                    className="mb-3"
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div>
                  <Label htmlFor="email" className="font-medium text-sm">
                    E-mail
                  </Label>
                  <Input
                    {...register('email')}
                    id="email"
                    placeholder="Digite seu e-mail"
                    className="mb-3"
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="profile_id"
                    render={({ field: { value, onChange } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="" id="type-profile">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={import.meta.env.VITE_ID_ADM}>
                            Administrador
                          </SelectItem>
                          <SelectItem value={import.meta.env.VITE_ID_EDIT}>
                            Editor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.profile_id && (
                    <span>{errors.profile_id.message}</span>
                  )}
                </div>

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
                  <Button onClick={onClose} type="button" variant="outline">
                    Cancelar
                  </Button>

                  <Button disabled={isPending}>Salvar</Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
