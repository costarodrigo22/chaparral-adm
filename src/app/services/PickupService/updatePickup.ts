import { httpClient } from '../httpClient';

interface IUpdatePickup {
  id: string;
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

export async function updatePickup({
  id,
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
  await httpClient.put(`/api/v1/pick_up_location/update/${id}`, body);
}
