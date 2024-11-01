import { httpClient } from '../httpClient';

export interface IRecipes {
  data: {
    card: {
      card_recipe_image: string;
      card_recipe_description: string;
    };
    page: {
      page_recipe_image: string;
      page_recipe_Ingredients: {
        ingredients_description: string;
        ingredients_icon_color: string;
        ingredients_background_color: string;
      };
      page_recipe_preparation_mode: {
        preparation_mode_description: string;
        preparation_mode_icon_color: string;
        preparation_mode_background_color: string;
      };
    };
  };
}

export async function recipesEdit(id: string) {
  // await new Promise(resolve => setTimeout(resolve, 10000));

  const { data } = await httpClient.get<IRecipes>(`/api/v1/user/edit/${id}`);

  return data.data;
}
