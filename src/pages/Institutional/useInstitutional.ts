import { httpClient } from '@/app/services/httpClient';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface infoBody {
  data: [
    {
      title: string;
      description: string;
    },
  ];
}

export default function useInstitutional() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageChanged, setisImageChanged] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState('');
  const [fileInstitutional, setfileInstitutional] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  function handleToggleIsTitleEditable() {
    setIsTitleEditable(!isTitleEditable);
  }
  function handleToggleIsDescEditable() {
    setIsDescEditable(!isDescEditable);
  }

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

  async function handleSendData() {
    const bodyInfo = {
      title: title,
      description: descricao,
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
    }
  }

  async function getBeAPartnersInfo() {
    try {
      setIsLoading(true);
      const infoRes = await httpClient.get<infoBody>(
        '/api/without/home_institutional_section/index',
      );
      const imageRes = await httpClient.get(
        '/api/without/home_institutional_section/display_image',
      );

      setDescricao(infoRes.data.data[0].description);
      setTitle(infoRes.data.data[0].title);
      setImage(imageRes.data);
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBeAPartnersInfo();
  }, []);

  return {
    handleSendData,
    setisImageChanged,
    isImageChanged,
    handleToggleIsDescEditable,
    handleToggleIsTitleEditable,
    isLoading,
    handleFileSelect,
    setIsDescEditable,
    setIsTitleEditable,
    isDescEditable,
    isTitleEditable,
    title,
    setTitle,
    descricao,
    setDescricao,
    getBeAPartnersInfo,
    image,
    setImage,
    fileInstitutional,
    setfileInstitutional,
  };
}
