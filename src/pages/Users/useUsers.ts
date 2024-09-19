import { UsersService } from '@/app/services/UsersService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export interface IUsersEdit {
  created_at: string;
  email: string;
  id: string;
  name: string;
  profile: {
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
  };
  updated_at: string;
}

export function useUsers() {
  const [openModalAddUsers, setOpenModalAddUsers] = useState(false);
  const [openModalEditUsers, setOpenModalEditUsers] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState<IUsersEdit | null>(
    {} as IUsersEdit,
  );
  const [modalDeleteUsers, setModalDeleteUsers] = useState(false);
  const [idToDeleteUser, setIdToDeleteUser] = useState('');

  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'profile.name', label: 'Perfil' },
    { key: 'email', label: 'E-mail' },
    { key: 'actions', label: 'Opções' },
  ];

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.users(),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: UsersService.userEdit,
  });

  const { isPending: isPendingDeleteUser, mutateAsync: mutateAsyncDeleteUser } =
    useMutation({
      mutationFn: UsersService.deleteUser,
    });

  function handleOpenModalAddUsers() {
    setOpenModalAddUsers(true);
  }

  function handleCloseModalAddUsers() {
    setOpenModalAddUsers(false);
  }

  async function handleOpenModalEditUsers(id: string) {
    setOpenModalEditUsers(true);

    try {
      const response = await mutateAsync(id);

      setDataUserEdit(response);
    } catch {
      toast.error('Erro ao buscar os dados do usuário!');
    }
  }

  function handleCloseModalEditUsers() {
    setOpenModalEditUsers(false);

    setDataUserEdit(null);
  }

  function handleOpenModalDeleteUser(id: string) {
    setModalDeleteUsers(true);

    setIdToDeleteUser(id);
  }

  function handleCloseModalDeleteUser() {
    setModalDeleteUsers(false);
  }

  async function handleDeleteUser() {
    try {
      await mutateAsyncDeleteUser(idToDeleteUser);

      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch {
      toast.error('Algo deu errado ao deletar o usuário!');
    } finally {
      handleCloseModalDeleteUser();
    }
  }

  return {
    data,
    headersTable,
    openModalAddUsers,
    openModalEditUsers,
    isFetching,
    dataUserEdit,
    isPending,
    modalDeleteUsers,
    isPendingDeleteUser,
    handleOpenModalEditUsers,
    handleCloseModalEditUsers,
    handleOpenModalAddUsers,
    handleCloseModalAddUsers,
    handleOpenModalDeleteUser,
    handleCloseModalDeleteUser,
    handleDeleteUser,
  };
}
