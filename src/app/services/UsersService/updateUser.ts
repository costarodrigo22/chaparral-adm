import { httpClient } from '../httpClient';

interface IUpdateUsers {
  name: string | undefined;
  email: string | undefined;
  profile_id: string | undefined;
  password?: string | undefined;
  id: string;
}

export async function updateUser({
  name,
  email,
  profile_id,
  password,
  id,
}: IUpdateUsers) {
  const body = {
    name,
    email,
    profile_id,
    password,
  };

  await httpClient.put(`/api/v1/user/update/${id}`, body);
}
