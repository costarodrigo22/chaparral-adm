import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { RocketIcon } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/Button';
import useAbout from './useAbout';

export default function Institutional() {
  const {
    descricao,
    image,
    isDescEditable,
    isImageChanged,
    isLoading,
    isTitleEditable,
    title,
    handleFileSelect,
    handleSendData,
    handleToggleIsDescEditable,
    handleToggleIsTitleEditable,
    setDescricao,
    setTitle,
    setisImageChanged,
  } = useAbout();

  return (
    <SectionsEditWrapper title="Institucional">
      <div className="flex flex-col gap-8">
        <div className="max-w-[514px] flex flex-col gap-8">
          <InputTypeWYSIWYG
            isEditable={isTitleEditable}
            onIsEditable={handleToggleIsTitleEditable}
            actualValue={title}
            onContentChange={content => setTitle(content)}
            title="Título"
          />
          <InputTypeWYSIWYG
            onIsEditable={handleToggleIsDescEditable}
            isEditable={isDescEditable}
            actualValue={descricao}
            onContentChange={content => setDescricao(content)}
            title="Descrição"
          />
        </div>
        <FileUploader
          actualImage={image}
          onFileSelect={(file, previewUrl) => {
            handleFileSelect('image', file, previewUrl);
            setisImageChanged(!isImageChanged);
          }}
          title="Imagem"
          height={328}
          width={514}
          suggestedHeight={810}
          suggestedWidth={1440}
        />
      </div>
      <div className="w-full flex items-center justify-end mt-9">
        <Button
          className="flex gap-3 items-center"
          onClick={() => handleSendData()}
          disabled={
            isLoading || !(isDescEditable || isTitleEditable || isImageChanged)
          }
        >
          {!isLoading ? (
            <>
              <RocketIcon size={20} />
              <span>Publicar</span>
            </>
          ) : (
            <ClipLoader size={20} color="red" />
          )}
        </Button>
      </div>
    </SectionsEditWrapper>
  );
}
