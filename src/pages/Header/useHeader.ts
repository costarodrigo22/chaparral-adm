import { httpClient } from "@/app/services/httpClient";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useHeader() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLogoChanged, setIsLogoChanged] = useState(false)
  const [isFeaturedChanged, setIsFeaturedChanged] = useState(false)
  const [logo, setLogo] = useState('');
  const [featured, setFeatured] = useState('');
  const [fileHeader, setfileHeader] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setfileHeader(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  async function getActualImages() {
    try {
      setIsLoading(true)
      const logoRes = await httpClient.get(
        '/api/without/home_header/display_image/logo',
      );
      const featuredRes = await httpClient.get(
        '/api/without/home_header/display_image/featured_image',
      );

      setLogo(logoRes?.data);
      setFeatured(featuredRes?.data);
    } catch (error) {
      toast.error('Erro ao buscar dados!')
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getActualImages();
  }, []);

  async function handlePostImages() {
    try {
      setIsLoading(true)
      if (fileHeader.Logo && fileHeader.Logo.file) {
        const formDataLogo = new FormData();
        formDataLogo?.append('file', fileHeader?.Logo?.file);

        await httpClient.post(
          '/api/v1/home_header/send_image/logo',
          formDataLogo,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
      }

      if (fileHeader.PapelDeParede && fileHeader.PapelDeParede.file) {
        const formDataFeaturedImage = new FormData();
        formDataFeaturedImage.append('file', fileHeader.PapelDeParede.file);

        await httpClient.post(
          '/api/v1/home_header/send_image/featured_image',
          formDataFeaturedImage,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
      }

      console.log('deu bom');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
      setIsFeaturedChanged(false)
      setIsLogoChanged(false)
    }
  }

  return { logo, featured, handleFileSelect, handlePostImages, setIsFeaturedChanged, setIsLogoChanged, isLogoChanged, isFeaturedChanged, isLoading }
}
