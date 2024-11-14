import { httpClient } from "@/app/services/httpClient";
import { PickupsService } from "@/app/services/PickupService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export interface infoBody {
  data: {
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
    created_at: string;
    updated_at: string;
  };
}

export interface IModalEditPickup {
  open: boolean;
  onClose: () => void;
  id: string;
}

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório!'),
  street: z.string().min(1, 'Rua é obrigatória!'),
  number: z.string().min(1, 'Número é obrigatório!'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório!'),
  city: z.string().min(1, 'Cidade é obrigatória!'),
  cep: z.string().min(1, 'CEP é obrigatório!').max(9, 'Insira um CEP válido'),
  uf: z.string().min(1, 'UF é obrigatória1').max(2, 'Insira uma UF válida!'),
  telephone_number: z.string().min(1, 'Telefone é obrigatório!'),
  operational_time: z
    .string()
    .min(1, 'O horário de funcionamento é obrigatório'),
});

export type PickupData = z.infer<typeof schema>;

export default function useModalEditPickup({ id, onClose }: IModalEditPickup) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PickupData>({
    resolver: zodResolver(schema),
  });

  const getSustainability = useCallback(async () => {
    try {
      setIsLoading(true);
      const infoRes = await httpClient.get<infoBody>(
        `/api/without/pick_up_location/find_by_id/${id}`,
      );
      reset({
        cep: infoRes.data.data.cep,
        city: infoRes.data.data.city,
        name: infoRes.data.data.name,
        neighborhood: infoRes.data.data.neighborhood,
        number: infoRes.data.data.number,
        operational_time: infoRes.data.data.operational_time,
        street: infoRes.data.data.street,
        telephone_number: infoRes.data.data.telephone_number,
        uf: infoRes.data.data.uf,
      });
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [reset, id]);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['PICKUPS'],
    mutationFn: PickupsService.updatePickup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PICKUPS'] });
      toast.success('Local de retirada atualizado com sucesso!');
      cancelReq();
    },
    onError: () => {
      toast.error('Ocorreu um erro ao editar o local de retirada.');
      cancelReq();
    },
  });

  async function HandleUpdatePickup({
    cep,
    city,
    name,
    neighborhood,
    number,
    operational_time,
    street,
    telephone_number,
    uf,
  }: PickupData) {
    const body = {
      id: id,
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

    try {
      await mutateAsync(body);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSustainability();
  }, [getSustainability]);

  function cancelReq() {
    onClose();
    reset({});
  }

  return { schema, cancelReq, HandleUpdatePickup, isPending, handleSubmit, register, errors, isLoading  }
}
