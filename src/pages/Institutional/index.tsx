import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import useInstitutional from './useInstitutional';
import { RocketIcon } from 'lucide-react';
import { ClockLoader } from 'react-spinners';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@radix-ui/react-label';
import { Controller } from 'react-hook-form';

export default function Institutional() {
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
    isLinkChanged,
    control,
    errors,
    hookFormHandleSubmit,
    register,
  } = useInstitutional();

  return (
    <SectionsEditWrapper title="Institucional">
      <form onSubmit={hookFormHandleSubmit(handleSendData)}>
        <div className="flex flex-col gap-8">
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
              <p className=" mt-[-40px] text-red-500">{errors.title.message}</p>
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
          <div className="flex flex-col gap-1">
            <Label htmlFor="Link">Link do vídeo no Youtube</Label>
            <Input
              id="Link"
              {...register('link')}
              placeholder="Ex: https://www.youtube.com/watch?v=JA7VbUsdb68"
            />
            {errors.link && (
              <span className="text-red-500 text-xs ">
                {errors.link.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-9">
          <Button
            className="flex gap-3 items-center"
            disabled={
              isLoading ||
              !(
                isDescEditable ||
                isTitleEditable ||
                isImageChanged ||
                isLinkChanged
              ) // Inclui isLinkChanged
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
