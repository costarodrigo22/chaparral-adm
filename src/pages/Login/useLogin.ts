import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  cpf: z.string().min(11, 'CPF inválido!'),
  password: z.string().min(3, 'Senha muito curta!'),
});

type FormSchema = z.infer<typeof schema>;

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit: hookFormHandleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(data => {
    console.log(data);
  });

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  return { showPassword, register, handleShowPassword, handleSubmit };
}
