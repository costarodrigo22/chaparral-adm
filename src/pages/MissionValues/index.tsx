import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import { Button } from '@/components/ui/Button';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { RocketIcon } from 'lucide-react';

import { Controller } from 'react-hook-form';
import { ClockLoader } from 'react-spinners';
import useMissionValues from './useMissionValues';

export default function MissionValues() {
  const {
    isMissionDescEditable,
    isSubTitleEditable,
    isValuesDescEditable,
    control,
    errors,
    handleSendData,
    handleToggleIsMissionDescEditable,
    handleToggleIsSubTitleEditable,
    handleToggleIsValuesDescEditable,
    hookFormHandleSubmit,
    handleToggleIsVisionDescEditable,
    isVisionDescEditable,
    isLoading,
    isValid,
    isFetching,
  } = useMissionValues();

  return (
    <SectionsEditWrapper title="Missão e Valores">
      <form onSubmit={hookFormHandleSubmit(handleSendData)}>
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClockLoader size={40} color="#ff0000" />
          </div>
        ) : (
          <>
            <Controller
              name="subtitle"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputTypeWYSIWYG
                  isEditable={isSubTitleEditable}
                  onIsEditable={handleToggleIsSubTitleEditable}
                  showEditButton
                  actualValue={value}
                  onContentChange={onChange}
                  title="Subtítulo"
                />
              )}
            />
            {errors.subtitle && (
              <p className="text-red-500 mt-[-50px]">
                {errors.subtitle.message}
              </p>
            )}
            <div className="flex w-full flex-col h-full gap-9">
              <Controller
                name="missionDesc"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputTypeWYSIWYG
                    isEditable={isMissionDescEditable}
                    onIsEditable={handleToggleIsMissionDescEditable}
                    showEditButton
                    actualValue={value}
                    onContentChange={onChange}
                    title="Descrição (Missão)"
                  />
                )}
              />
              {errors.missionDesc && (
                <p className="text-red-500 mt-[-50px]">
                  {errors.missionDesc.message}
                </p>
              )}
              <Controller
                name="valuesVision"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputTypeWYSIWYG
                    isEditable={isVisionDescEditable}
                    onIsEditable={handleToggleIsVisionDescEditable}
                    showEditButton
                    actualValue={value}
                    onContentChange={onChange}
                    title="Descrição (Visão)"
                  />
                )}
              />
              {errors.valuesDesc && (
                <p className="text-red-500 mt-[-50px]">
                  {errors.valuesDesc.message}
                </p>
              )}

              <Controller
                name="valuesDesc"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputTypeWYSIWYG
                    isEditable={isValuesDescEditable}
                    onIsEditable={handleToggleIsValuesDescEditable}
                    showEditButton
                    actualValue={value}
                    onContentChange={onChange}
                    title="Descrição (Valores)"
                  />
                )}
              />
              {errors.valuesDesc && (
                <p className="text-red-500 mt-[-50px]">
                  {errors.valuesDesc.message}
                </p>
              )}
            </div>
          </>
        )}
        <div className="w-full flex items-center justify-end mt-9">
          <Button
            className="flex gap-3 items-center"
            onClick={hookFormHandleSubmit(handleSendData)}
            disabled={
              isLoading ||
              !(
                isMissionDescEditable ||
                isValuesDescEditable ||
                isSubTitleEditable ||
                isVisionDescEditable
              ) ||
              !isValid
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
