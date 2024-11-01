import { httpClient } from '../httpClient';

interface IRecipes {
  data: {
    title: string;
    id: string;
  };
}

export async function recipes() {
  const { data } = await httpClient.get<IRecipes>('/api/');

  return data.data;
}
