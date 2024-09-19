import { httpClient } from '../httpClient';

interface IAddUsers {
  name: string;
  email: string;
  password: string;
  profile_id: string;
}

export async function addUsers({
  name,
  email,
  password,
  profile_id,
}: IAddUsers) {
  const body = {
    name,
    email,
    password,
    profile_id,
  };

  await httpClient.post('/api/v1/user/store', body);
}
