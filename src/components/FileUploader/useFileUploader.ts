import { useState } from 'react';
import { httpClient } from '@/app/services/httpClient';

export default function useFileUploader(
  endpoint: string | undefined,
  onFileSelect: (file: File | null, previewUrl: string | null) => void
) {
  const [image, setImage] = useState<string | null>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [uniqueId] = useState(() => Math.random().toString(36));

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      setImage(null);
      onFileSelect(null, null);
      return;
    }

    const imageURL = URL.createObjectURL(selectedFile);
    setImage(imageURL);

    if (endpoint) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await httpClient.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Imagem enviada com sucesso!');
          onFileSelect(selectedFile, imageURL);
        }
      } catch (error) {
        console.error('Erro ao enviar imagem:', error);
      }
    } else {
      onFileSelect(selectedFile, imageURL);
    }
  }

  function handleDeleteImage() {
    setDisplayImage(null);
    onFileSelect(null, null);
  }

  return { image, handleFileChange, handleDeleteImage, uniqueId, setDisplayImage, displayImage };
}
