import { httpClient } from '../httpClient';

interface IUpdatePickup {
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  cep: string;
  uf: string;
  telephone_number: string;
  operational_time: string;
}

export async function addPickup({
  cep,
  city,
  name,
  neighborhood,
  number,
  operational_time,
  street,
  telephone_number,
  uf,
}: IUpdatePickup) {
  const body = {
    cep,
    city,
    name,
    neighborhood,
    number,
    operational_time,
    street,
    telephone_number,
    uf,
  };
  const res = await httpClient.post('/api/v1/pick_up_location/create', body);
  return res;
}
