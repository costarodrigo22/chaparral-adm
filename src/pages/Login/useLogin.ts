import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthService } from '@/app/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { ISingin } from '@/app/services/AuthService/singin';

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
    const { access_token } = await mutateAsync(data);

    console.log(access_token);
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
