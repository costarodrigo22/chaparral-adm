import { useAuth } from '@/app/hooks/useAuth';
import InputImage from '@/components/InputImage';
import { Button } from '@/components/ui/Button';
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
import { Eye, EyeOff, Info, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/app/services/UsersService';
import { toast } from 'sonner';

interface IModalEditsers {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ModalEditUser({ open, onClose }: IModalEditsers) {
  const [showPassword, setShowPassword] = useState(false);

  const { userLogged } = useAuth();

  console.log('modal: ', userLogged);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: UsersService.updateUser,
  });

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        profile_id: userLogged.data?.profile.id,
        id: userLogged.data?.id ?? '',
      });

      reset();

      onClose();

      toast.success('Usuário atualizado!');
    } catch {
      toast.error('Erro ao atualizar um usuário!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['userrLogged'] });
    }
  });

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  useEffect(() => {
    if (userLogged) {
      reset({
        name: userLogged.data?.name || '',
        email: userLogged.data?.email || '',
      });
    }
  }, [userLogged, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Preencha as informações de edição
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center w-full mb-2">
          <InputImage idUserLogged={userLogged.data?.id} />
        </div>

        <div className="w-full flex">
          <Info size={18} stroke="#08964F" />

          <span className="text-sm font-medium ml-2">Informações Gerais</span>
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

          <div className="flex items-center gap-2 mt-4">
            <ShieldCheck size={18} stroke="#08964F" />

            <span className="text-sm font-medium">Segurança</span>
          </div>

          <Separator />

          <div className="w-full relative">
            <Label htmlFor="Senha">Senha</Label>
            <Input
              id="Senha"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span className="text-red-500 text-xs ">
                {errors.password.message}
              </span>
            )}

            {showPassword && (
              <EyeOff
                data-testid="toggle-pass"
                size={35}
                color="#a7a7a7"
                className="absolute top-7 right-0 items-center pr-3"
                onClick={handleShowPassword}
              />
            )}

            {!showPassword && (
              <Eye
                data-testid="toggle-pass-show"
                size={35}
                color="#a7a7a7"
                className="absolute top-7 right-0 items-center pr-3"
                onClick={handleShowPassword}
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button type="submit" disabled={isPending}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
