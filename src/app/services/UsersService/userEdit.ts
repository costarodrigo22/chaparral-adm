import { httpClient } from '../httpClient';

export interface IUsers {
  data: {
    created_at: string;
    email: string;
    id: string;
    name: string;
    profile: {
      created_at: string;
      id: string;
      name: string;
      updated_at: string;
    };
    updated_at: string;
  };
}

export async function userEdit(id: string) {
  // await new Promise(resolve => setTimeout(resolve, 10000));

  const { data } = await httpClient.get<IUsers>(`/api/v1/user/edit/${id}`);

  return data.data;
}
