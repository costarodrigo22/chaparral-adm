import { httpClient } from '../httpClient';

interface IPDVs {
  data: {
    title: string;
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    uf: string;
    cep: string;
  };
}

export async function PDVS() {
  const { data } = await httpClient.get<IPDVs>('/api/');

  return data.data;
}
