import { httpClient } from '../httpClient';

export async function deletePDV(id: string) {
  await httpClient.delete(`/api/v1/partners/delete/${id}`);
}
