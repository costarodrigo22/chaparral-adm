import { httpClient } from '../httpClient';

interface IAddPDVs {
  title: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  cep: string;
}

export async function addPDVs({
  city,
  neighborhood,
  number,
  street,
  title,
  uf,
  cep,
}: IAddPDVs) {
  const body = {
    city,
    neighborhood,
    number,
    street,
    title,
    uf,
    cep,
  };
  await httpClient.post('', body);
}
