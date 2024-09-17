import { httpClient } from '../httpClient';

interface IUsers {
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

export async function users() {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const { data } = await httpClient.get<IUsers>('/api/v1/user/index');

  return data.data;
}
