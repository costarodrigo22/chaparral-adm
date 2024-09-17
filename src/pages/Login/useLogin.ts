import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthService } from '@/app/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { ISingin } from '@/app/services/AuthService/singin';
import { useAuth } from '@/app/hooks/useAuth';
import { toast } from 'sonner';

const schema = z.object({
  email: z
    .string()
    .min(1, 'Informe um email')
    .email('Informe um e-mail válido'),
  password: z.string().min(3, 'Senha muito curta!'),
});

type FormSchema = z.infer<typeof schema>;

export const SINGIN_MUTATION_KEY = ['singin'];

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { signin } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: SINGIN_MUTATION_KEY,
    mutationFn: async (data: ISingin) => {
      return AuthService.singin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      const { access_token } = await mutateAsync(data);

      signin(access_token);
    } catch {
      toast.error('Erro ao fazer login!');
    }
  });

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  return {
    showPassword,
    errors,
    isPending,
    register,
    handleShowPassword,
    handleSubmit,
  };
}
