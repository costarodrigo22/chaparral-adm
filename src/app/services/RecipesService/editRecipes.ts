import { httpClient } from '../httpClient';

export interface IRecipes {
  data: {
    card: {
      id: string;
      name: string;
      base64: string;
      start_color: string;
      description: string;
      final_color: string;
    };
    page: {
      id: string;
      base64: string;
    };
    page_recipe_ingredients: {
      ingredients_description: string;
      ingredients_icon_color: string;
      ingredients_background_color: string;
    };
    page_recipe_preparation_mode: {
      preparation_method_description: string;
      preparation_method_icon_color: string;
      preparation_method_background_color: string;
    };
  };
}

export async function recipesEdit(id: string) {
  const { data } = await httpClient.get<IRecipes>(
    `/api/v1/recipes/get_recipe_info/${id}`,
  );

  return data.data;
}
