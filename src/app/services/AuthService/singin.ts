import { httpClient } from '../httpClient';

export interface ISingin {
  email: string;
  password: string;
}

interface IReturnSingin {
  data: {
    access_token: string;
    token_type: string;
    user: {
      created_at: string;
      email: string;
      id: string;
      name: string;
      profile_id: string;
      updated_at: string;
    };
  };
}

export async function singin({ email, password }: ISingin) {
  const body = {
    email,
    password,
  };

  const { data } = await httpClient.post<IReturnSingin>('/api/login', body);

  return data.data;
}
