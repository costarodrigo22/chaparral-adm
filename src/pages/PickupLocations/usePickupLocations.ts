import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PickupsService } from '@/app/services/PickupService';
import { useState } from 'react';
import { toast } from 'sonner';


export default function usePickupLocations() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [id, setId] = useState('');
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddPickupModal, setOpenAddPickupModal] = useState<boolean>(false);
  const [openModalDeletePickup, setOpenModalDeletePickup] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['PICKUPS'],
    queryFn: () => PickupsService.pickups(),
  });

  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'actions', label: 'Opções' },
  ];

  const filteredData =
    data?.data?.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const {
    isPending: isPendingDeletePickup,
    mutateAsync: mutateAsyncDeletePickup,
  } = useMutation({
    mutationFn: PickupsService.deletePickup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PICKUPS'] });

      toast.success('Local de retirada deletado com sucesso!');
    },
    onError: () => {
      toast.error('Algo deu errado ao deletar o Local de entrega!');
    },
  });

  async function handleDeletePickup() {
    try {
      await mutateAsyncDeletePickup(id);
    } finally {
      setOpenModalDeletePickup(false);
    }
  }
  return { handleDeletePickup, isPendingDeletePickup, data, filteredData, headersTable, setOpenAddPickupModal, openAddPickupModal, setOpenEditModal, id, isFetching, openModalDeletePickup, openEditModal, setOpenModalDeletePickup, searchTerm, setId, setSearchTerm  }
}
