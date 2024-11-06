import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import { Controller } from 'react-hook-form';
import useModalAddRecipe from './useModalAddRecipe';
import { useEffect } from 'react';

interface IModalAddRecipe {
  onClose: () => void;
  open: boolean;
}

export default function ModalAddRecipes({ onClose, open }: IModalAddRecipe) {
  const {
    control,
    errors,
    activeTab,
    setActiveTab,
    fileRecipe,
    handleFileSelect,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    onSubmit,
    onCancel,
    watch,
  } = useModalAddRecipe(onClose);

  useEffect(() => {
    if (!fileRecipe.cardImage || !watch('card_recipe_description')) {
      setActiveTab('header');
    }
  }, [fileRecipe, watch, setActiveTab]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[713px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Receita</DialogTitle>
        </DialogHeader>

        <Separator />

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="header">Cabeçalho</TabsTrigger>
              <TabsTrigger
                disabled={
                  !fileRecipe.cardImage || !watch('card_recipe_description')
                }
                value="recipeData"
              >
                Dados da receita
              </TabsTrigger>
            </TabsList>
            <TabsContent value="header">
              <div className="w-full flex flex-col gap-5 mt-9">
                <FileUploader
                  height={200}
                  width={355}
                  suggestedHeight={200}
                  suggestedWidth={355}
                  title="Imagem do card"
                  actualImage={fileRecipe?.cardImage?.previewUrl || undefined}
                  onFileSelect={(file, previewUrl) => {
                    handleFileSelect('cardImage', file, previewUrl);
                  }}
                />
                <div className="w-full flex flex-col">
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="card_recipe_description"
                      render={({ field: { onChange, value } }) => (
                        <InputTypeWYSIWYG
                          isEditable
                          showEditButton={false}
                          onContentChange={onChange}
                          actualValue={value}
                          title="Descrição"
                        />
                      )}
                    />
                    {errors.card_recipe_description && (
                      <p className="text-red-500">
                        {errors.card_recipe_description.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <InfoIcon size={20} color="#5959ff" />
                    <span>
                      O gradient sera de cima (cor inicial) para baixo (cor
                      final)
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 mt-3">
                    <div className="w-[140px]">
                      <Controller
                        control={control}
                        name="card_recipe_start_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Cor inicial"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.card_recipe_start_color && (
                        <p className="text-red-500 text-xs">
                          {errors.card_recipe_start_color.message}
                        </p>
                      )}
                    </div>
                    <div className="w-[140px]">
                      <Controller
                        control={control}
                        name="card_recipe_final_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Cor final"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.card_recipe_final_color && (
                        <p className="text-red-500 text-xs">
                          {errors.card_recipe_final_color.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-end w-full mt-4">
                <Button
                  type="button"
                  onClick={() => onCancel()}
                  className="bg-white hover:bg-slate-100 border border-[#E2E8F0] dark:border-[#222222] dark:bg-black dark:hover:opacity-85"
                >
                  <span className="text-[#0F172A] dark:text-white">
                    Cancelar
                  </span>
                </Button>
                <Button
                  onClick={handleNextStep}
                  type="button"
                  disabled={
                    !fileRecipe.cardImage || !watch('card_recipe_description')
                  }
                >
                  <div className="flex gap-2 items-center justify-center">
                    <span>Continuar</span>
                    <ArrowRightIcon size={20} />
                  </div>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="recipeData">
              <div className="my-9 flex flex-col gap-10">
                <FileUploader
                  height={200}
                  width={520}
                  suggestedHeight={550}
                  actualImage={fileRecipe?.bannerImage?.previewUrl || undefined}
                  suggestedWidth={1340}
                  title="Banner da receita"
                  onFileSelect={(file, previewUrl) => {
                    handleFileSelect('bannerImage', file, previewUrl);
                  }}
                />
                <div className="flex items-center gap-5 h-auto">
                  <div className="w-full h-full flex flex-col">
                    <Controller
                      control={control}
                      name="ingredients_description"
                      render={({ field: { onChange, value } }) => (
                        <InputTypeWYSIWYG
                          isEditable
                          showEditButton={false}
                          onContentChange={onChange}
                          actualValue={value}
                          title="Ingredientes"
                        />
                      )}
                    />
                    {errors.ingredients_description && (
                      <p className="text-red-500 mt-8">
                        {errors.ingredients_description.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    <div>
                      <Controller
                        control={control}
                        name="ingredients_icon_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Ícone"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.ingredients_icon_color && (
                        <p className="text-red-500 text-xs">
                          {errors.ingredients_icon_color.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Controller
                        control={control}
                        name="ingredients_background_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Cor de fundo"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.ingredients_background_color && (
                        <p className="text-red-500 text-xs">
                          {errors.ingredients_background_color.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5 h-auto">
                  <div className="w-full h-full flex flex-col">
                    <Controller
                      control={control}
                      name="preparation_mode_description"
                      render={({ field: { onChange, value } }) => (
                        <InputTypeWYSIWYG
                          isEditable
                          showEditButton={false}
                          onContentChange={onChange}
                          actualValue={value}
                          title="Modo de preparo"
                        />
                      )}
                    />
                    {errors.preparation_mode_description && (
                      <p className="text-red-500 mt-8">
                        {errors.preparation_mode_description.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    <div>
                      <Controller
                        control={control}
                        name="preparation_mode_icon_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Ícone"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.preparation_mode_icon_color && (
                        <p className="text-red-500 text-xs">
                          {errors.preparation_mode_icon_color.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Controller
                        control={control}
                        name="preparation_mode_background_color"
                        render={({ field: { onChange, value } }) => (
                          <ColorPicker
                            title="Cor de fundo"
                            actualVal={value}
                            onColorChange={onChange}
                          />
                        )}
                      />
                      {errors.preparation_mode_background_color && (
                        <p className="text-red-500 text-xs">
                          {errors.preparation_mode_background_color.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={handlePreviousStep}
                  type="button"
                  className="bg-white hover:bg-slate-100 border border-[#E2E8F0] dark:border-[#222222] dark:bg-black dark:hover:opacity-85"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <ArrowLeftIcon
                      size={20}
                      className="text-black dark:text-white"
                    />
                    <span className="text-[#0F172A] dark:text-white">
                      Retornar
                    </span>
                  </div>
                </Button>
                <div className="flex gap-8">
                  <Button
                    type="button"
                    onClick={() => onCancel()}
                    className="bg-white hover:bg-slate-100 border border-[#E2E8F0] dark:border-[#222222] dark:bg-black dark:hover:opacity-85"
                  >
                    <span className="text-[#0F172A] dark:text-white">
                      Cancelar
                    </span>
                  </Button>
                  <Button type="submit" disabled={!fileRecipe.bannerImage}>
                    <div className="flex gap-2 items-center justify-center">
                      <span>Enviar</span>
                    </div>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
