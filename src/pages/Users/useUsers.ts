import { useState } from 'react';

export function useUsers() {
  const [openModalAddUsers, setOpenModalAddUsers] = useState(false);
  const [openModalEditUsers, setOpenModalEditUsers] = useState(false);

  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'profile', label: 'Perfil' },
    { key: 'email', label: 'E-mail' },
    { key: 'actions', label: 'Opções' },
  ];

  const data = [
    {
      name: 'Rodrigo Costa Silva',
      profile: 'Admistrador',
      email: 'costarodrigosilva247@gmail.com',
    },
    {
      name: 'Joãozinho da Silva',
      profile: 'Vendedor',
      email: 'Joãozinho@gmail.com',
    },
    {
      name: 'Zé Pequeno',
      profile: 'Admistrador',
      email: 'zepequeno@gmail.com',
    },
    {
      name: 'Coquin',
      profile: 'Vendedor',
      email: 'coquin@gmail.com',
    },
  ];

  function handleOpenModalAddUsers() {
    setOpenModalAddUsers(true);
  }

  function handleCloseModalAddUsers() {
    setOpenModalAddUsers(false);
  }

  function handleOpenModalEditUsers() {
    setOpenModalEditUsers(true);
  }

  function handleCloseModalEditUsers() {
    setOpenModalEditUsers(false);
  }

  return {
    headersTable,
    openModalAddUsers,
    openModalEditUsers,
    handleOpenModalEditUsers,
    handleCloseModalEditUsers,
    handleOpenModalAddUsers,
    handleCloseModalAddUsers,
    data,
  };
}
