import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Login from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as useLoginModule from '../useLogin';

const mockHandleSubmit = vi.fn();

vi.spyOn(useLoginModule, 'useLogin').mockReturnValue({
  showPassword: false,
  errors: {},
  isPending: false,
  register: vi.fn(),
  handleShowPassword: vi.fn(),
  handleSubmit: (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    const formData = {
      email: 'costarodrigosilva247@gmail.com',
      password: '123123',
    };
    return mockHandleSubmit(formData);
  },
});

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

describe('Login Page', () => {
  test('Should be able render login page', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>,
    );

    expect(getByText('LOGIN ÍAÇA')).toBeInTheDocument();
  });

  test('Should be able render form login', () => {
    const { getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>,
    );

    const userField = getByLabelText('Usuário');
    const passwordField = getByLabelText('Senha');

    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test('Should be able update values in inputs when the users type', async () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>,
    );

    const inputUser = getByPlaceholderText('Email');
    const inputPassword = getByPlaceholderText('Digite sua senha');

    await userEvent.type(inputUser, '61234432323');
    await userEvent.type(inputPassword, '123456789');

    expect(inputUser).toHaveValue('61234432323');
    expect(inputPassword).toHaveValue('123456789');
  });

  test('Should be able to submit form', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>,
    );

    const inputUser = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Digite sua senha');

    await userEvent.type(inputUser, 'costarodrigosilva247@gmail.com');
    await userEvent.type(inputPassword, '123123');

    fireEvent.submit(screen.getByTestId('form-test'));

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      email: 'costarodrigosilva247@gmail.com',
      password: '123123',
    });
  });
});
