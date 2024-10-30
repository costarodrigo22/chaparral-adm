import { httpClient } from "../httpClient";

interface IEditPDVs{
  title: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  cep: string
}

export async function editPDVs({ city, neighborhood, number, street, title, uf, cep }:IEditPDVs) {
  const body = {
    city,
    neighborhood,
    number,
    street,
    title,
    uf,
    cep
  };
  await httpClient.put('', body)
}
