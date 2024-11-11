import { httpClient } from '../httpClient';

interface IAddPDVs {
  street: string;
  name: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  cep: string;
  telephone_number: string;
}

export async function addPDVs({
  city,
  name,
  neighborhood,
  number,
  street,
  uf,
  cep,
  telephone_number,
}: IAddPDVs) {
  const body = {
    name,
    city,
    neighborhood,
    number,
    street,
    uf,
    cep,
    telephone_number,
  };
  const res = await httpClient.post('/api/v1/partners/create', body);
  console.log('resposta na service de res:', res);

  return res;
}
