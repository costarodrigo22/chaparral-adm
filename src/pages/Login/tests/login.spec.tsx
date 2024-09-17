import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Login from '..';

const mockFnSubmit = vi.fn(); // Mock da função de submissão

vi.mock('@/pages/login/useLogin', () => ({
  useLogin: () => ({
    handleSubmit: mockFnSubmit,
    register: vi.fn(),
    errors: { email: '', password: '' },
  }),
}));

describe('Login Page', () => {
  test('Should be able render login page', () => {
    const { getByText } = render(<Login />);

    expect(getByText('LOGIN ÍAÇA')).toBeInTheDocument();
  });

  test('Should be able render form login', () => {
    const { getByLabelText } = render(<Login />);

    const userField = getByLabelText('Usuário');
    const passwordField = getByLabelText('Senha');

    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test('Should be able update values in inputs when the users type', async () => {
    const { getByPlaceholderText } = render(<Login />);

    const inputUser = getByPlaceholderText('Email');
    const inputPassword = getByPlaceholderText('Digite sua senha');

    await userEvent.type(inputUser, '61234432323');
    await userEvent.type(inputPassword, '123456789');

    expect(inputUser).toHaveValue('61234432323');
    expect(inputPassword).toHaveValue('123456789');
  });

  test('Should be able to submit form', async () => {
    render(<Login />);

    const inputUser = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Digite sua senha');
    const form = screen.getByTestId('form-test');

    await userEvent.type(inputUser, '61234432323');
    await userEvent.type(inputPassword, '123123');

    fireEvent.submit(form);

    // expect(mockFnSubmit).toHaveBeenCalled();
  });
});
