import { addRecipe, IAddRecipe } from './addRecipe';
import { addCardImage } from './addCardImage';
import { addPageImage } from './addPageImage';

export interface ICreateFullRecipe extends IAddRecipe {
  imageFiles: [File, File];
}

export async function createFullRecipe({
  home_recipe_card,
  recipe_ingredients,
  recipe_preparation_mode,
  imageFiles
}: ICreateFullRecipe) {
  try {
    const recipeResponse = await addRecipe({
      home_recipe_card,
      recipe_ingredients,
      recipe_preparation_mode,
    });

    const cardId = recipeResponse.data?.card?.id;
    const pageId = recipeResponse.data?.page?.id;

    if (!cardId || !pageId) {
      throw new Error("Recipe ID or Card ID is missing in the response");
    }

    const cardImageResponse = await addCardImage({ id: cardId, file: imageFiles[0] });
    const pageImageResponse = await addPageImage({ id: pageId, file: imageFiles[1] });

    return {
      recipeResponse,
      imageResponses: [cardImageResponse, pageImageResponse],
    };
  } catch (error) {
    console.error('Error creating full recipe with images:', error);
  }
}
