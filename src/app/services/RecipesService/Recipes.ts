import { httpClient } from '../httpClient';

interface IRecipes {
  name: string;
  id: string;
}

interface IRecipesResponse {
  data: IRecipes[];
  last_page: number;
}

export async function recipes() {
  const { data } = await httpClient.get<IRecipesResponse>(
    '/api/without/recipes_cards/get_list',
  );

  return data;
}
