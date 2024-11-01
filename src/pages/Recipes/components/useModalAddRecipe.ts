import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useModalAddRecipe(onClose: () => void) {
  function onCancel() {
    reset();
    setfileRecipe({});
    onClose();
  }

  const recipeSchema = z.object({
    card_recipe_description: z.string().min(1, 'Descrição é obrigatória'),
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema), // Integrando o Zod com o React Hook Form
    defaultValues: {
      card_recipe_description: '',
      ingredients_description: '',
      ingredients_icon_color: '#000000',
      ingredients_background_color: '#000000',
      preparation_mode_description: '',
      preparation_mode_icon_color: '#000000',
      preparation_mode_background_color: '#000000',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(fileRecipe);
    if (!fileRecipe.cardImage) {
      console.log('ta sem imagem');
    }
  };

  return {
    onSubmit,
    control,
    onCancel,
    watch,
    handleSubmit,
    activeTab,
    setActiveTab,
    fileRecipe,
    errors,
    handleFileSelect,
    handlePreviousStep,
    handleNextStep,
  };
}
