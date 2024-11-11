import { httpClient } from '@/app/services/httpClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface infoBody {
  data: [
    {
      title: string;
      description: string;
      link: string;
    },
  ];
}

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  link: z
    .string()
    .url('Link deve ser uma URL válida')
    .min(1, 'Link do vídeo é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function useInstitutional() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageChanged, setisImageChanged] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [isLinkChanged, setIsLinkChanged] = useState(false);
  const [image, setImage] = useState('');
  const [fileInstitutional, setfileInstitutional] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const {
    control,
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      link: '',
    },
  });

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setfileInstitutional(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  async function handleSendData(data: FormData) {
    console.log(data);

    const bodyInfo = {
      title: data.title,
      description: data.description,
      link: data.link,
    };

    try {
      setIsLoading(true);
      await httpClient.post(
        '/api/v1/home_institutional_section/update_info',
        bodyInfo,
      );

      if (fileInstitutional.image && fileInstitutional.image.file) {
        const formDataInstitutional = new FormData();
        formDataInstitutional.append('file', fileInstitutional.image.file);

        await httpClient.post(
          '/api/v1/home_institutional_section/send_image',
          formDataInstitutional,
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
      setIsLinkChanged(false);
    }
  }

  const getBeAPartnersInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const infoRes = await httpClient.get<infoBody>(
        '/api/without/home_institutional_section/index',
      );
      const imageRes = await httpClient.get(
        '/api/without/home_institutional_section/display_image',
      );

      reset({
        title: infoRes.data.data[0].title,
        description: infoRes.data.data[0].description,
        link: infoRes.data.data[0].link,
      });
      setImage(imageRes.data);
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    getBeAPartnersInfo();
  }, [getBeAPartnersInfo]);

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'link') {
        setIsLinkChanged(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    control,
    register,
    errors,
    hookFormHandleSubmit,
    handleSendData,
    setisImageChanged,
    isImageChanged,
    isLoading,
    handleFileSelect,
    isDescEditable,
    isLinkChanged,
    isTitleEditable,
    handleToggleIsDescEditable: () => setIsDescEditable(!isDescEditable),
    handleToggleIsTitleEditable: () => setIsTitleEditable(!isTitleEditable),
    image,
  };
}
