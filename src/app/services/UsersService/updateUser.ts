import { httpClient } from '../httpClient';

interface IUpdateUsers {
  name: string;
  email: string;
  profile_id: string;
  id: string;
}

export async function updateUser({
  name,
  email,
  profile_id,
  id,
}: IUpdateUsers) {
  const body = {
    name,
    email,
    profile_id,
  };

  await httpClient.put(`/api/v1/user/update/${id}`, body);
}
