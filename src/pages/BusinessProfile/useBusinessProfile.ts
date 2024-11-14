import { httpClient } from '@/app/services/httpClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface infoBody {
  data: {
    id: string;
    name: string;
    cnpj: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    cep: string;
    state: string;
    phone_number: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

const schema = z.object({
  informations: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    cnpj: z.string().min(1, 'CNPJ é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    cep: z.string().min(1, 'CEP é obrigatório'),
    state: z.string().min(1, 'Estado é obrigatório'),
  }),
  contacts: z.object({
    phone_number: z.string().min(1, 'Número de telefone é obrigatório'),
    whatsapp: z
      .string()
      .min(1, 'Link do WhatsApp é obrigatório')
      .url('Deve ser um link.'),
    instagram: z
      .string()
      .min(1, 'Link do Instagram é obrigatório')
      .url('Deve ser um link.'),
    facebook: z
      .string()
      .min(1, 'Link do Facebook é obrigatório')
      .url('Deve ser um link.'),
    email: z.string().min(1, 'Email é obrigatório').email('Deve ser um Email.'),
  }),
});

type BusinessData = z.infer<typeof schema>;

export default function useBusinessProfile() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<BusinessData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = useCallback(async () => {
    try {
      const res = await httpClient.get<infoBody>(
        '/api/without/company_profile/get',
      );
      console.log(res);
      reset({
        contacts: {
          email: res.data.data.email,
          facebook: res.data.data.facebook,
          instagram: res.data.data.instagram,
          phone_number: res.data.data.phone_number,
          whatsapp: res.data.data.whatsapp,
        },
        informations: {
          cep: res.data.data.cep,
          city: res.data.data.city,
          cnpj: res.data.data.cnpj,
          name: res.data.data.name,
          neighborhood: res.data.data.neighborhood,
          number: res.data.data.number,
          state: res.data.data.state,
          street: res.data.data.street,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao buscar os dados.');
    }
  }, [reset]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  async function handleSendData(data: BusinessData) {
    const body = {
      name: data.informations.name,
      cnpj: data.informations.cnpj,
      street: data.informations.street,
      number: data.informations.number,
      neighborhood: data.informations.neighborhood,
      city: data.informations.city,
      cep: data.informations.cep,
      state: data.informations.state,
      phone_number: data.contacts.phone_number,
      whatsapp: data.contacts.whatsapp,
      instagram: data.contacts.instagram,
      facebook: data.contacts.facebook,
      email: data.contacts.email,
    };
    try {
      setIsLoading(true);
      await httpClient.put('/api/v1/company_profile/update', body);
      toast.success('Dados atualizados!');
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao atualizar os dados.');
    } finally {
      setIsLoading(false);
    }
  }

  return { handleSendData, isLoading, handleSubmit, register, errors, isDirty };
}
