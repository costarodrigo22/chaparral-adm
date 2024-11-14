import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PDVsService } from '@/app/services/PDVsService';
import { useState } from 'react';
import { toast } from 'sonner';

export default function usePDVs() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openModalDeletePDV, setOpenModalDeletePDV] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [id, setId] = useState('');

  const queryClient = useQueryClient();

  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'actions', label: 'Opções' },
  ];

  const { data, isFetching } = useQuery({
    queryKey: ['PDVS'],
    queryFn: () => PDVsService.PDVS(),
  });

  const filteredData =
    data?.data?.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const { isPending: isPendingDeletePdv, mutateAsync: mutateAsyncDeletePDV } =
    useMutation({
      mutationFn: PDVsService.deletePDV,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['PDVS'] });

        toast.success('PDV deletado com sucesso!');
      },
      onError: () => {
        toast.error('Algo deu errado ao deletar o PDV!');
      },
    });

  async function handleDeletePDV() {
    try {
      await mutateAsyncDeletePDV(id);
    } finally {
      setOpenModalDeletePDV(false);
    }
  }

  return {
    handleDeletePDV,
    isPendingDeletePdv,
    id,
    data,
    searchTerm,
    setOpenModalDeletePDV,
    filteredData,
    isFetching,
    headersTable,
    setOpenAddModal,
    openAddModal,
    openEditModal,
    setOpenEditModal,
    openModalDeletePDV,
    setId,
    setSearchTerm,
  };
}
