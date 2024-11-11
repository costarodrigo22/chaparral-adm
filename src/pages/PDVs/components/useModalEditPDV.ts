import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { PDVsService } from '@/app/services/PDVsService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { httpClient } from '@/app/services/httpClient';

export default function useModalEditPDVs(onClose: () => void, id: string) {
  const [carousselFile, setCarousselFile] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});
  const [actualImage, setActualImage] = useState<string>('');

  const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    telephone_number: z
      .string()
      .min(1, 'Bairro é obrigatório')
      .max(11, 'Apenas DDD e Número'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatório'),
    uf: z
      .string()
      .min(1, 'UF é obrigatório')
      .max(2, 'Apenas a Sigla do estado, ex: MA'),
    cep: z.string().min(1, 'CEP é obrigatório').max(9, 'CEP inválido'),
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

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['PDVS'],
    mutationFn: PDVsService.updatePDV,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        id: id,
        name: data.name,
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        street: data.street,
        uf: data.uf,
        telephone_number: data.telephone_number,
      });

      if (carousselFile && Object.keys(carousselFile).length > 0) {
        const formData = new FormData();
        const fileKey = Object.keys(carousselFile)[0];
        const file = carousselFile[fileKey]?.file;

        if (file) {
          formData.append('file', file);
          formData.append('id', id);

          await httpClient.post('/api/v1/partners/submit_image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      }
      reset();
      setCarousselFile({});
      onClose();
      toast.success('PDV editado com sucesso!');
    } catch {
      toast.error('Erro ao editar o PDV!');
    } finally {
      queryClient.invalidateQueries({ queryKey: ['PDVS'] });
    }
  });

  function cancelReq() {
    reset();
    setCarousselFile({});
    onClose();
  }

  const handleGetEditData = useCallback(async () => {
    try {
      const res = await httpClient.get(
        `/api/without/partners/find_by_id/${id}`,
      );

      const resImage = await httpClient.get<string>(
        `/api/v1/partners/display_image/${id}`,
      );

      setActualImage(resImage.data);

      reset({
        name: res.data.data.name || '',
        street: res.data.data.street || '',
        neighborhood: res.data.data.neighborhood || '',
        telephone_number: res.data.data.telephone_number || '',
        number: res.data.data.number || '',
        city: res.data.data.city || '',
        uf: res.data.data.uf || '',
        cep: res.data.data.cep || '',
      });

      if (res.data.data.carousselFile) {
        setCarousselFile({
          [res.data.data.carousselFile.key]: {
            file: res.data.data.carousselFile.file || null,
            previewUrl: res.data.data.carousselFile.previewUrl || null,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, reset]);

  useEffect(() => {
    if (id) {
      handleGetEditData();
    }
  }, [handleGetEditData, id]);

  return {
    register,
    cancelReq,
    reset,
    errors,
    handleSubmit,
    isPending,
    handleFileSelect,
    actualImage,
    carousselFile,
  };
}
