import { httpClient } from '../httpClient';

export interface IUsers {
  data: {
    created_at: string;
    email: string;
    id: string;
    name: string;
    image: string;
    profile: {
      created_at: string;
      id: string;
      name: string;
      updated_at: string;
    };
    updated_at: string;
  };
}

export async function userLogged() {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const { data } = await httpClient.get('/api/v1/user/logged_in_user');

  const dataReturn = {
    created_at: data.data.created_at,
    email: data.data.email,
    id: data.data.id,
    name: data.data.name,
    updated_at: data.data.updated_at,
    image: data.data.image,
    profile: {
      created_at: data.data.profile.created_at,
      id: data.data.profile.id,
      name: data.data.profile.name,
      updated_at: data.data.profile.updated_at,
    },
  };

  return dataReturn;
}
