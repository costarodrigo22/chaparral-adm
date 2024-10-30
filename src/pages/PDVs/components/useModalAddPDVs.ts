import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { PDVsService } from '@/app/services/PDVsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function useModalAddPDVs(onClose: () => void) {

  const schema = z.object({
    title: z.string().min(1, 'Nome é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatório'),
    uf: z.string().min(1, 'UF é obrigatório'),
    cep: z.string().min(1, 'CEP é obrigatório'),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: PDVsService.addPDVs,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    console.log(data);

    try {
      await mutateAsync({
        title: data.title,
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        street: data.street,
        uf: data.uf,
      });
      reset();
      onClose();
      toast.success('PDV cadastrado!');
    } catch {
      toast.error('Erro ao adicionar um PDV!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['PDVs'] });
    }
  });

  return { register, errors, handleSubmit, isPending }
}
