import { httpClient } from '@/app/services/httpClient';
import { RecipesService } from '@/app/services/RecipesService';
import { IRecipes } from '@/app/services/RecipesService/editRecipes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const RECIPES_QUERYKEY = ['RECIPES'];

interface ResData {
  card: {
    id: string;
    base64: string;
  };
  page: {
    id: string;
    base64: string;
  };
}

export default function useModalEditRecipe(onClose: () => void, id: string) {
  const [activeTab, setActiveTab] = useState('header');
  const [dataRes, setDataRes] = useState<ResData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [fileRecipe, setfileRecipe] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

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

  type FormSchema = z.infer<typeof recipeSchema>;

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
      card_recipe_start_color: '',
      card_recipe_final_color: '',
      ingredients_description: '',
      ingredients_icon_color: '',
      ingredients_background_color: '',
      preparation_mode_description: '',
      preparation_mode_icon_color: '',
      preparation_mode_background_color: '',
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: RecipesService.updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERYKEY });
      reset();
      setfileRecipe({});
      onClose();
    },
    onError: error => {
      console.error('Erro ao editar receita:', error);
    },
  });

  const uploadImage = async (file: File, url: string, id: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    await httpClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const onSubmit = async (form: FormSchema) => {
    const cardImageFile = fileRecipe['cardImage']?.file;
    const bannerImageFile = fileRecipe['bannerImage']?.file;

    try {
      setIsLoading(true);
      await mutateAsync({
        id: id,
        home_recipe_card: {
          name: form.name,
          description: form.card_recipe_description,
          start_color: form.card_recipe_start_color,
          final_color: form.card_recipe_final_color,
        },
        recipe_ingredients: {
          ingredients_background_color: form.ingredients_background_color,
          ingredients_description: form.ingredients_description,
          ingredients_icon_color: form.ingredients_icon_color,
        },
        recipe_preparation_mode: {
          preparation_method_background_color:
            form.preparation_mode_background_color,
          preparation_method_description: form.preparation_mode_description,
          preparation_method_icon_color: form.preparation_mode_icon_color,
        },
      });
      if (cardImageFile && dataRes?.card?.id) {
        await uploadImage(
          cardImageFile,
          '/api/v1/recipes/create_card_image',
          dataRes?.card?.id,
        );
      }
      if (bannerImageFile && dataRes?.page?.id) {
        await uploadImage(
          bannerImageFile,
          '/api/v1/recipes/create_page_image',
          dataRes?.page?.id,
        );
      }
      toast.success('Receita editada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao editar a receita!');
    } finally {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERYKEY });
    }
  };

  const handleGetEditData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await httpClient.get<IRecipes>(
        `/api/v1/recipes/get_recipe_info/${id}`,
      );
      console.log(res);
      const data = res.data.data;

      if (data) setDataRes(data);
      reset({
        name: data.card.name,
        card_recipe_description: data.card.description,
        card_recipe_start_color: data.card.start_color,
        card_recipe_final_color: data.card.final_color,
        ingredients_description:
          data.page_recipe_ingredients.ingredients_description,
        ingredients_icon_color:
          data.page_recipe_ingredients.ingredients_icon_color,
        ingredients_background_color:
          data.page_recipe_ingredients.ingredients_background_color,
        preparation_mode_description:
          data.page_recipe_preparation_mode.preparation_method_description,
        preparation_mode_icon_color:
          data.page_recipe_preparation_mode.preparation_method_icon_color,
        preparation_mode_background_color:
          data.page_recipe_preparation_mode.preparation_method_background_color,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, reset]);

  useEffect(() => {
    if (id) {
      handleGetEditData();
    }
  }, [handleGetEditData, id]);

  return {
    onSubmit,
    control,
    onCancel,
    watch,
    isPending,
    dataRes,
    handleSubmit,
    activeTab,
    setActiveTab,
    fileRecipe,
    errors,
    handleFileSelect,
    handlePreviousStep,
    register,
    handleNextStep,
    isLoading,
  };
}
