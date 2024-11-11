import { addCardImage } from './addCardImage';
import { addPageImage } from './addPageImage';
import { addRecipe } from './addRecipe';
import { createFullRecipe } from './createFullRecipe';
import { deleteRecipe } from './deleteRecipe';
import { recipesEdit } from './editRecipes';
import { recipes } from './Recipes';
import { updateRecipe } from './updateRecipe';

export const RecipesService = {
  recipes,
  recipesEdit,
  updateRecipe,
  addRecipe,
  addPageImage,
  addCardImage,
  createFullRecipe,
  deleteRecipe,
};
