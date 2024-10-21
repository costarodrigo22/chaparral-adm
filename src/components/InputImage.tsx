import { httpClient } from '@/app/services/httpClient';
// import { useQueryClient } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import { toast } from 'sonner';

interface IInputImage {
  idUserLogged: string;
}

export default function InputImage({ idUserLogged }: IInputImage) {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const queryClient = useQueryClient();

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setIsLoading(true);

    if (!file) return;

    const formData = new FormData();
    formData.append('files[]', file);

    try {
      await httpClient.post(
        `/api/v1/user/profile_picture/${idUserLogged}`,
        formData,
      );

      toast.success('Sua foto de perfil foi modificada');
    } catch {
      toast.error('Erro ao carregar foto do usuário!');
    } finally {
      setIsLoading(false);

      await handleGetImage();

      // queryClient.invalidateQueries({ queryKey: ['userrLogged'] });
    }
  }

  const handleGetImage = useCallback(async () => {
    if (!idUserLogged) return;

    setIsLoading(true);

    // await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const profileImage = await httpClient.get(
        `/api/v1/user/display_photo/${idUserLogged}`,
      );

      setImage(profileImage.data);
    } catch {
      toast.error('Erro ao buscar sua foto de perfil!');
    } finally {
      setIsLoading(false);
    }
  }, [idUserLogged]);

  useEffect(() => {
    handleGetImage();
  }, [idUserLogged, handleGetImage]);

  return (
    <div className="w-40 h-40 border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
      <label
        htmlFor="imageUpload"
        className="cursor-pointer flex flex-col items-center"
      >
        {image ? (
          <img src={image} className="w-40 h-40" />
        ) : (
          <>
            <ImagePlus className="w-6 h-6 text-gray-400" />
            <span className="mt-2 text-xs text-gray-500">Adicionar Imagem</span>
          </>
        )}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={isLoading}
        />
      </label>

      {isLoading && <ClockLoader color="#6b7280" size={25} />}
    </div>
  );
}
