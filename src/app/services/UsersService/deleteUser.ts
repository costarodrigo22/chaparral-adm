import { httpClient } from '../httpClient';

export async function deleteUser(id: string) {
  await httpClient.delete(`/api/v1/user/destroy/${id}`);
}
