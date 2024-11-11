import { httpClient } from '../httpClient';

interface IUpdatePDV {
  id: string;
  name: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  cep: string;
  telephone_number: string;
}

export async function updatePDV({
  city,
  neighborhood,
  number,
  street,
  name,
  uf,
  telephone_number,
  cep,
  id,
}: IUpdatePDV) {
  const body = {
    city,
    neighborhood,
    number,
    street,
    telephone_number,
    name,
    uf,
    cep,
  };
  await httpClient.put(`/api/v1/partners/update/${id}`, body);
}
