import { PickupsService } from "@/app/services/PickupService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export interface IModalAddPickup {
  open: boolean;
  onClose: () => void;
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

export default function useModalAddPickup({ onClose }: IModalAddPickup) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PickupData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['PICKUPS'],
    mutationFn: PickupsService.addPickup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PICKUPS'] });
      toast.success('Local de retirada criado com sucesso!');
      cancelReq();
    },
    onError: () => {
      toast.error('Ocorreu um erro ao criar o local de retirada.');
      cancelReq();
    },
  });

  async function HandleAddPickup({
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
      setIsLoading(true)
      await mutateAsync(body);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  function cancelReq() {
    onClose();
    reset({});
  }

  return { schema, cancelReq, HandleAddPickup, isPending, handleSubmit, register, errors, isLoading  }
}
