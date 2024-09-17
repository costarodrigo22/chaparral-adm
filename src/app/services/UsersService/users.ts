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

export async function users() {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const { data } = await httpClient.get('/api/v1/user/index');

  const dataReturn = {
    created_at: data.data[0].created_at,
    email: data.data[0].email,
    id: data.data[0].id,
    name: data.data[0].name,
    updated_at: data.data[0].updated_at,
    profile: {
      created_at: data.data[0].created_at,
      id: data.data[0].id,
      name: data.data[0].name,
      updated_at: data.data[0].updated_at,
    },
  };

  return dataReturn;
}
