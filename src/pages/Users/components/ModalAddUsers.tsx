import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Controller } from 'react-hook-form';
import { UsersService } from '@/app/services/UsersService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatório'),
  profile_id: z.string().min(1, 'Tipo de perfil é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface IModalAddUsers {
  open: boolean;
  onClose: () => void;
}

export default function ModalAddUsers({ open, onClose }: IModalAddUsers) {
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: UsersService.addUsers,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        profile_id: data.profile_id,
      });

      reset();

      onClose();

      toast.success('Usuário cadastrado!');
    } catch {
      toast.error('Erro ao adicionar um usuário!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações de cadastro
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Info size={18} stroke="#08964F" />

          <span className="text-sm font-medium">Informações Gerais</span>
        </div>

        <Separator />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
          data-testid="form-to-test"
        >
          <div className="flex flex-col">
            <Label htmlFor="name" className="font-medium text-sm mb-1">
              Nome
            </Label>
            <Input
              {...register('name')}
              id="name"
              placeholder="Nome"
              className=""
            />
            {errors.name && (
              <span className="text-red-400 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email" className="font-medium text-sm mb-1">
              E-mail
            </Label>
            <Input
              {...register('email')}
              id="email"
              placeholder="Digite seu e-mail"
              className=""
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="type-profile" className="font-medium text-sm mb-1">
              Tipo de perfil
            </Label>
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
              <span className="text-red-400 text-xs">
                {errors.profile_id.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <ShieldCheck size={18} stroke="#08964F" />

            <span className="text-sm font-medium">Segurança</span>
          </div>

          <Separator />

          <div>
            <Label htmlFor="password" className="font-medium text-sm mt-4">
              Senha
            </Label>
            <Input
              {...register('password')}
              id="password"
              placeholder="******"
              className=""
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button type="submit" disabled={isPending}>
              Cadastrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
