import { httpClient } from '../httpClient';

export interface IAddRecipe {
  recipe_preparation_mode: {
    preparation_method_description: string;
    preparation_method_icon_color: string;
    preparation_method_background_color: string;
  };
  recipe_ingredients: {
    ingredients_description: string;
    ingredients_icon_color: string;
    ingredients_background_color: string;
  };
  home_recipe_card: {
    name: string;
    description: string;
    start_color: string;
    final_color: string;
  };
}

export async function addRecipe({
  home_recipe_card,
  recipe_ingredients,
  recipe_preparation_mode,
}: IAddRecipe) {
  const body = {
    recipe_preparation_mode: {
      preparation_method_description:
        recipe_preparation_mode.preparation_method_description,
      preparation_method_icon_color:
        recipe_preparation_mode.preparation_method_icon_color,
      preparation_method_background_color:
        recipe_preparation_mode.preparation_method_background_color,
    },
    recipe_ingredients: {
      ingredients_description: recipe_ingredients.ingredients_description,
      ingredients_icon_color: recipe_ingredients.ingredients_icon_color,
      ingredients_background_color:
        recipe_ingredients.ingredients_background_color,
    },
    home_recipe_card: {
      name: home_recipe_card.name,
      description: home_recipe_card.description,
      start_color: home_recipe_card.start_color,
      final_color: home_recipe_card.final_color,
    },
  };

  try {
    const response = await httpClient.post('/api/v1/recipes/create', body);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
}
