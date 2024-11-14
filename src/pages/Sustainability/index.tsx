import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { RocketIcon } from 'lucide-react';
import { ClockLoader } from 'react-spinners';
import { Button } from '@/components/ui/Button';
import { Controller } from 'react-hook-form';
import useSustainability from './useSustainability';

export default function Sustainability() {
  const {
    image,
    isDescEditable,
    isImageChanged,
    isLoading,
    isTitleEditable,
    handleFileSelect,
    handleSendData,
    handleToggleIsDescEditable,
    handleToggleIsTitleEditable,
    setisImageChanged,
    control,
    isFetching,
    errors,
    hookFormHandleSubmit,
  } = useSustainability();

  return (
    <SectionsEditWrapper title="Sustentabilidade">
      <form onSubmit={hookFormHandleSubmit(handleSendData)}>
        <div className="flex flex-col gap-8">
          {isFetching ? (
            <div className="w-full h-full flex items-center justify-center">
              <ClockLoader size={40} color="#ff0000" />
            </div>
          ) : (
            <>
              <div className="max-w-[514px] flex flex-col gap-8">
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputTypeWYSIWYG
                      isEditable={isTitleEditable}
                      onIsEditable={handleToggleIsTitleEditable}
                      showEditButton
                      actualValue={value}
                      onContentChange={onChange}
                      title="Título"
                    />
                  )}
                />
                {errors.title && (
                  <p className=" mt-[-40px] text-red-500">
                    {errors.title.message}
                  </p>
                )}
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputTypeWYSIWYG
                      onIsEditable={handleToggleIsDescEditable}
                      isEditable={isDescEditable}
                      showEditButton
                      actualValue={value}
                      onContentChange={onChange}
                      title="Descrição"
                    />
                  )}
                />
                {errors.description && (
                  <p className=" mt-[-40px] text-red-500">
                    {errors.description.message}
                  </p>
                )}
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
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-end mt-9">
          <Button
            className="flex gap-3 items-center"
            disabled={
              isLoading ||
              !(isDescEditable || isTitleEditable || isImageChanged)
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
      </form>
    </SectionsEditWrapper>
  );
}
