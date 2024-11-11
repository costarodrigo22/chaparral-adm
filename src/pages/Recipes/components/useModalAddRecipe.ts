import { RecipesService } from '@/app/services/RecipesService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const RECIPES_QUERYKEY = ['RECIPES']

export default function useModalAddRecipe(onClose: () => void) {
  function onCancel() {
    reset();
    setfileRecipe({});
    onClose();
  }

  const recipeSchema = z.object({
    name: z.string().min(1, 'Nome da receita é obrigatório'),
    card_recipe_description: z.string().min(1, 'Descrição é obrigatória'),
    card_recipe_start_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
    card_recipe_final_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
    ingredients_description: z.string().min(1, 'Ingredientes são obrigatórios'),
    ingredients_icon_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
    ingredients_background_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
    preparation_mode_description: z
      .string()
      .min(1, 'Modo de preparo é obrigatório'),
    preparation_mode_icon_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
    preparation_mode_background_color: z
      .string()
      .min(4, 'Obrigatório')
      .max(7, 'Apenas HEXADECIMAL'),
  });

  type FormSchema = z.infer<typeof recipeSchema>

  const [activeTab, setActiveTab] = useState('header');
  const [fileRecipe, setfileRecipe] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const handleNextStep = () => {
    if (activeTab === 'header') {
      setActiveTab('recipeData');
    }
  };

  const handlePreviousStep = () => {
    if (activeTab === 'recipeData') {
      setActiveTab('header');
    }
  };

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setfileRecipe(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      card_recipe_description: '',
      card_recipe_start_color: '#FFFFFF',
      card_recipe_final_color: '#FFFFFF',
      ingredients_description: '',
      ingredients_icon_color: '#00DB99',
      ingredients_background_color: '#5E14FF',
      preparation_mode_description: '',
      preparation_mode_icon_color: '#DB0084',
      preparation_mode_background_color: '#FDECE5',
    },
  });


  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: RecipesService.createFullRecipe,
    onSuccess: () => {
      toast.success('Receita criada com sucesso!')
      queryClient.invalidateQueries({queryKey: RECIPES_QUERYKEY});
      reset();
      setfileRecipe({});
      onClose();
    },
    onError: () => {
      console.error('Ocorreu um erro ao criar a receita:');
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const imageFiles = [
      fileRecipe['cardImage']?.file,
      fileRecipe['bannerImage']?.file,
    ].filter(Boolean) as [File, File];

    if (imageFiles.length !== 2) {
      console.error('É necessário selecionar duas imagens para o envio.');
      return;
    }

    try {
      await mutateAsync({
        home_recipe_card: {
          name: data.name,
          description: data.card_recipe_description,
          start_color: data.card_recipe_start_color,
          final_color: data.card_recipe_final_color,
        },
        recipe_ingredients: {
          ingredients_background_color: data.ingredients_background_color,
          ingredients_description: data.ingredients_description,
          ingredients_icon_color: data.ingredients_icon_color,
        },
        recipe_preparation_mode: {
          preparation_method_background_color: data.preparation_mode_background_color,
          preparation_method_description: data.preparation_mode_description,
          preparation_method_icon_color: data.preparation_mode_icon_color,
        },
        imageFiles,
      });
    } catch (error) {
      console.error(error);
    }
  };


  return {
    onSubmit,
    control,
    onCancel,
    watch,
    isPending,
    handleSubmit,
    activeTab,
    setActiveTab,
    fileRecipe,
    errors,
    handleFileSelect,
    handlePreviousStep,
    register,
    handleNextStep,
  };
}
