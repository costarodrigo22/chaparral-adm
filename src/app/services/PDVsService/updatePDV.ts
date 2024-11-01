import { httpClient } from '../httpClient';

interface IUpdatePDV {
  title: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  cep: string;
}

export async function updatePDV({
  city,
  neighborhood,
  number,
  street,
  title,
  uf,
  cep,
}: IUpdatePDV) {
  const body = {
    city,
    neighborhood,
    number,
    street,
    title,
    uf,
    cep,
  };
  await httpClient.put('', body);
}
