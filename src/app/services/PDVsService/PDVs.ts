import { httpClient } from '../httpClient';

interface IPDV {
  name: string;
  id: string;
}

interface IPDVs {
  data: IPDV[];  // Corrigido para representar um array de objetos IPDV
  meta: {
    last_page: number;
  };
}

export async function PDVS() {
  const { data } = await httpClient.get<IPDVs>('/api/without/partners/get_all_paginated');

  return data;
}
