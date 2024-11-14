import { httpClient } from '@/app/services/httpClient';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface infoBody {
  data: [
    {
      title: string;
      description: string;
    },
  ];
}

export default function useBeAPartner() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isImageChanged, setisImageChanged] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState('');
  const [fileBeAPartner, setFileBeAPartner] = useState<{
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
    setFileBeAPartner(prevState => ({
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
      await httpClient.put(
        '/api/v1/home_be_a_partner_section/update_info',
        bodyInfo,
      );

      if (fileBeAPartner.image && fileBeAPartner.image.file) {
        const formDataBeAPartner = new FormData();
        formDataBeAPartner.append('file', fileBeAPartner.image.file);
        formDataBeAPartner.append('image_type', 'featured_image');

        await httpClient.post(
          '/api/v1/home_be_a_partner_section/send_image',
          formDataBeAPartner,
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

  const getBeAPartnersInfo = useCallback(async () => {
    try {
      setFetching(true);
      const infoRes = await httpClient.get<infoBody>(
        '/api/without/home_be_a_partner_section/index',
      );
      const imageRes = await httpClient.get(
        '/api/without/home_be_a_partner_section/display_image',
      );

      setDescricao(infoRes.data.data[0].description);
      setTitle(infoRes.data.data[0].title);
      setImage(imageRes.data);
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setFetching(false);
    }
  }, [setFetching]);

  useEffect(() => {
    getBeAPartnersInfo();
  }, [getBeAPartnersInfo]);

  return {
    isFetching,
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
    fileBeAPartner,
    setFileBeAPartner,
  };
}
