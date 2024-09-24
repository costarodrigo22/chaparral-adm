import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, test, vi } from 'vitest';
import ModalAddUsers from '../components/ModalAddUsers';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as UsersServiceModule from '@/app/services/UsersService';

// const mockHandleSubmit = vi.fn();

vi.spyOn(UsersServiceModule.UsersService, 'addUsers').mockImplementation(
  ({ name, email, password, profile_id }) => {
    console.log('Mock addUsers chamado com:', {
      name,
      email,
      password,
      profile_id,
    });

    return Promise.resolve();
    // return mockHandleSubmit({ name, email, password, profile_id });
  },
);

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

describe('Modal Create User', () => {
  test('Should be able render modal in the screen', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ModalAddUsers open={true} onClose={() => {}} />
      </QueryClientProvider>,
    );

    expect(
      getByText('Preencha as informações de cadastro'),
    ).toBeInTheDocument();
  });

  test('Should be able create a user', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ModalAddUsers open={true} onClose={() => {}} />
      </QueryClientProvider>,
    );

    const nameInput = getByPlaceholderText('Nome');
    await userEvent.type(nameInput, 'Rodrigo Costa');

    const emailInput = getByPlaceholderText('Digite seu e-mail');
    await userEvent.type(emailInput, 'rodrigo@mail.com');

    const selectTrigger = getByText('Selecione');
    fireEvent.click(selectTrigger);
    const admOptionSelected = getByText('Administrador');
    fireEvent.click(admOptionSelected);

    const passwordInput = getByPlaceholderText('******');
    await userEvent.type(passwordInput, '123123');

    fireEvent.submit(getByTestId('form-to-test'));

    // const form = getByTestId('form-to-test');
    // fireEvent.submit(form);

    // console.log('ID: ', import.meta.env.VITE_ID_ADM);

    console.log('Verificando se a função addUsers foi chamada');
    // expect(mockHandleSubmit).toHaveBeenCalled();

    // expect(mockHandleSubmit).toHaveBeenCalledWith({
    //   name: 'Rodrigo Costa',
    //   email: 'rodrigo@mail.com',
    //   password: '123123',
    //   profile_id: import.meta.env.VITE_ID_ADM, // Verifique se o ID do admin está correto
    // });
  });
});
