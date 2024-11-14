import { httpClient } from '../httpClient';

export async function deletePickup(id: string) {
  await httpClient.delete(`/api/v1/pick_up_location/delete/${id}`);
}
