import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { PDVsService } from '@/app/services/PDVsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
export default function useModalAddPDVs(onClose: () => void) {
  const [carousselFile, setCarousselFile] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    telephone_number: z.string().min(1, 'Bairro é obrigatório'),
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

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setCarousselFile(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  const {
    isPending,
    mutateAsync,
    data: idData,
  } = useMutation({
    mutationKey: ['PDVS'],
    mutationFn: PDVsService.addPDVs,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    console.log(data);

    try {
      await mutateAsync({
        name: data.name,
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        street: data.street,
        uf: data.uf,
        telephone_number: data.telephone_number,
      });
      console.log(idData.id);

      reset();
      setCarousselFile({});
      onClose();
      toast.success('PDV cadastrado!');
    } catch {
      toast.error('Erro ao adicionar um PDV!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['PDVS'] });
    }
  });

  function cancelReq() {
    reset();
    setCarousselFile({});
    onClose();
  }

  return {
    register,
    cancelReq,
    errors,
    handleSubmit,
    isPending,
    handleFileSelect,
    carousselFile,
  };
}
