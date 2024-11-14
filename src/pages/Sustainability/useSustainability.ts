import { httpClient } from '@/app/services/httpClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface infoBody {
  data:
    {
      title: string;
      description: string;
      base64: string;
    },

}

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function useSustainability() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageChanged, setisImageChanged] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [image, setImage] = useState('');
  const [fileSustainability, setfileSustainability] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setfileSustainability(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  async function handleSendData(data: FormData) {
    console.log(data);

    const bodyInfo = {
      title: data.title,
      description: data.description,
    };

    try {
      setIsLoading(true);
      await httpClient.put(
        '/api/v1/about_sub_header/update',
        bodyInfo,
      );

      if (fileSustainability.image && fileSustainability.image.file) {
        const formDataSustainability = new FormData();
        formDataSustainability.append('file', fileSustainability.image.file);

        await httpClient.post(
          '/api/v1/about_sub_header/submit_image',
          formDataSustainability,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
      }
      toast.success('Informações enviadas com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao enviar os dados');
    } finally {
      setIsLoading(false);
      setisImageChanged(false);
      setIsDescEditable(false);
      setIsTitleEditable(false);
    }
  }

  const getSustainability = useCallback(async () => {
    try {
      setIsLoading(true);
      const infoRes = await httpClient.get<infoBody>(
        '/api/without/about_sub_header/get',
      );

      reset({
        title: infoRes.data.data.title,
        description: infoRes.data.data.description,
      });
      setImage(infoRes.data.data.base64);
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    getSustainability();
  }, [getSustainability]);

  return {
    control,
    errors,
    hookFormHandleSubmit,
    handleSendData,
    setisImageChanged,
    isImageChanged,
    isLoading,
    handleFileSelect,
    isDescEditable,
    isTitleEditable,
    handleToggleIsDescEditable: () => setIsDescEditable(!isDescEditable),
    handleToggleIsTitleEditable: () => setIsTitleEditable(!isTitleEditable),
    image,
  };
}
