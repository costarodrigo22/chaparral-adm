import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Users from '..';
import userEvent from '@testing-library/user-event';
import ModalAddUsers from '../components/ModalAddUsers';

const mockUsersData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    profile: {
      name: 'Admin',
    },
    created_at: '2023-09-01T00:00:00.000Z',
    updated_at: '2023-09-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    profile: {
      name: 'User',
    },
    created_at: '2023-09-01T00:00:00.000Z',
    updated_at: '2023-09-01T00:00:00.000Z',
  },
];

let mockopenModalAddUsers = false;
const mockHandleOpenAddUser = vi.fn();
const mockHandleCloseAddUser = vi.fn();

vi.mock('@/pages/Users/useUsers', () => ({
  useUsers: () => ({
    data: mockUsersData,
    headersTable: [
      { key: 'name', label: 'Nome' },
      { key: 'profile.name', label: 'Perfil' },
      { key: 'email', label: 'E-mail' },
      { key: 'actions', label: 'Opções' },
    ],
    openModalAddUsers: mockopenModalAddUsers,
    handleOpenModalAddUsers: () => {
      mockopenModalAddUsers = true;

      return mockHandleOpenAddUser;
    },
  }),
}));

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

describe('Users Page', () => {
  test('Should be able render Users page', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>,
    );

    expect(getByText('Usuários')).toBeInTheDocument();
  });

  test('Should be able list users', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>,
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
    expect(getByText('Admin')).toBeInTheDocument();
  });

  test('Should be able open modal create user', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>,
    );

    const btnOpenModal = getByTestId('btn-new-user');

    await userEvent.click(btnOpenModal);

    render(
      <QueryClientProvider client={queryClient}>
        <ModalAddUsers
          open={mockopenModalAddUsers}
          onClose={mockHandleCloseAddUser}
        />
      </QueryClientProvider>,
    );

    const textInModal = getByText('Preencha as informações de cadastro');

    expect(textInModal).toBeInTheDocument();
  });
});
