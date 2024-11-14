import { httpClient } from '@/app/services/httpClient';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface infoBody {
  data: {
    title: string;
    description: string;
  };
}

export default function useAbout() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
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
    console.log('Enviando dados:', { title, descricao });
    console.log('fileInstitutional:', fileInstitutional);

    const bodyInfo = {
      title: title,
      description: descricao,
    };

    try {
      setIsLoading(true);

      // Envia título e descrição
      await httpClient.put('/api/v1/about_header/update', bodyInfo);
      console.log('Título e descrição enviados com sucesso');

      // Envia a imagem se estiver presente
      if (
        fileInstitutional['aboutImage'] &&
        fileInstitutional['aboutImage'].file
      ) {
        const formDataInstitutional = new FormData();
        formDataInstitutional.append(
          'file',
          fileInstitutional['aboutImage'].file,
        );
        await httpClient.post(
          '/api/v1/about_header/submit_image',
          formDataInstitutional,
        );
        console.log('Imagem enviada com sucesso');
      }

      toast.success('Informações enviadas com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast.error('Erro ao enviar os dados');
    } finally {
      setIsLoading(false);
      setisImageChanged(false);
      setIsDescEditable(false);
      setIsTitleEditable(false);
    }
  }

  async function getAboutInfo() {
    try {
      setIsFetching(true);
      const infoRes = await httpClient.get<infoBody>(
        '/api/without/about_header/get',
      );
      const imageRes = await httpClient.get(
        '/api/without/about_header/display_image',
      );

      setDescricao(infoRes?.data?.data?.description);
      setTitle(infoRes?.data?.data?.title);
      setImage(imageRes?.data);
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getAboutInfo();
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
    isFetching,
    title,
    setTitle,
    descricao,
    setDescricao,
    getAboutInfo,
    image,
    setImage,
    fileInstitutional,
    setfileInstitutional,
  };
}
