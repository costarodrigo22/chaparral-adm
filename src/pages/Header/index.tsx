import FileUploader from '@/components/FileUploader';
import { Button } from '@/components/ui/Button';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { RocketIcon } from 'lucide-react';
import useHeader from './useHeader';
import { ClockLoader } from 'react-spinners';

export default function Header() {
  const {
    featured,
    handleFileSelect,
    handlePostImages,
    logo,
    isFeaturedChanged,
    isLoading,
    isLogoChanged,
    setIsFeaturedChanged,
    setIsLogoChanged,
    isFetching,
  } = useHeader();

  return (
    <div className="w-full flex items-center justify-center">
      <SectionsEditWrapper title="Imagens">
        <div className="w-full flex xl:items-end h-full flex-col xl:flex-row xl:justify-start gap-10 xl:gap-28">
          {isFetching ? (
            <div className="flex items-center justify-center w-full h-full">
              <ClockLoader size={40} color="#f00" />
            </div>
          ) : (
            <>
              <FileUploader
                onFileSelect={(file, previewUrl) => {
                  handleFileSelect('Logo', file, previewUrl);
                  setIsLogoChanged(true);
                }}
                suggestedHeight={80}
                suggestedWidth={140}
                height={80}
                actualImage={logo}
                title="Logotipo"
                width={140}
              />
              <FileUploader
                suggestedHeight={800}
                actualImage={featured}
                suggestedWidth={1440}
                onFileSelect={(file, previewUrl) => {
                  handleFileSelect('PapelDeParede', file, previewUrl);
                  setIsFeaturedChanged(true);
                }}
                height={192}
                width={342}
                title="Papel de parede"
              />
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-end mt-9">
          <Button
            className="flex gap-3 items-center"
            onClick={() => handlePostImages()}
            disabled={isLoading || !(isFeaturedChanged || isLogoChanged)}
          >
            {isLoading ? (
              <ClockLoader size={20} color="red" />
            ) : (
              <>
                <RocketIcon size={20} />
                <span>Publicar</span>
              </>
            )}
          </Button>
        </div>
      </SectionsEditWrapper>
    </div>
  );
}
