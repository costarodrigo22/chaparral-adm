import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import { Button } from '@/components/ui/Button';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { RocketIcon } from 'lucide-react';
import useBeAPartner from './useBeAPartner';
import { ClockLoader } from 'react-spinners';

export default function BeAPartner() {
  const {
    descricao,
    setDescricao,
    setTitle,
    title,
    image,
    handleFileSelect,
    handleSendData,
    isLoading,
    isDescEditable,
    isTitleEditable,
    handleToggleIsDescEditable,
    handleToggleIsTitleEditable,
    setisImageChanged,
    isImageChanged,
    isFetching,
  } = useBeAPartner();

  return (
    <SectionsEditWrapper title="Seja Parceiro">
      <div className="flex gap-8 items-start">
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClockLoader size={40} color="#ff0000" />
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[456px] gap-10">
              <InputTypeWYSIWYG
                isEditable={isTitleEditable}
                showEditButton
                onIsEditable={handleToggleIsTitleEditable}
                actualValue={title}
                onContentChange={content => setTitle(content)}
                title="Título"
              />
              <InputTypeWYSIWYG
                onIsEditable={handleToggleIsDescEditable}
                isEditable={isDescEditable}
                showEditButton
                actualValue={descricao}
                onContentChange={content => setDescricao(content)}
                title="Descrição"
              />
            </div>
            <div>
              <FileUploader
                title="Imagem"
                actualImage={image}
                height={328}
                onFileSelect={(file, previewUrl) => {
                  handleFileSelect('image', file, previewUrl);
                  setisImageChanged(!isImageChanged);
                }}
                width={278}
                suggestedHeight={785}
                suggestedWidth={630}
              />
            </div>
          </>
        )}
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
            <ClockLoader size={20} color="red" />
          )}
        </Button>
      </div>
    </SectionsEditWrapper>
  );
}
