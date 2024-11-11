import { httpClient } from '../httpClient';

export async function deleteRecipe(id: string) {
  await httpClient.delete(`/api/v1/recipes/delete/${id}`);
}
