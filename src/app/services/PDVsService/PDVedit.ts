import { httpClient } from '../httpClient';

export interface IPDVEdit {
  data: {
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
}

export async function pdvEdit(id: string) {

  const { data } = await httpClient.get<IPDVEdit>(`/api/without/partners/find_by_id/${id}`);

  return data.data;
}
