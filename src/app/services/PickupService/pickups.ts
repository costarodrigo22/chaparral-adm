import { httpClient } from '../httpClient';

interface IPickup {
  name: string;
  id: string;
}

interface IPickups {
  data: IPickup[];
  meta: {
    last_page: number;
  };
}

export async function pickups() {
  const { data } = await httpClient.get<IPickups>(
    '/api/without/pick_up_location/get_all',
  );

  return data;
}
