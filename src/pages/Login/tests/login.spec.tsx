import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Login from '..';

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

    const inputUser = getByPlaceholderText('cpf');
    const inputPassword = getByPlaceholderText('Digite sua senha');

    await userEvent.type(inputUser, '61234432323');
    await userEvent.type(inputPassword, '123456789');

    expect(inputUser).toHaveValue('61234432323');
    expect(inputPassword).toHaveValue('123456789');
  });

  test('Should be able toggle the type input', async () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);

    const inputPassword = getByPlaceholderText('Digite sua senha');

    const togglePassShow = getByTestId('toggle-pass-show');

    expect(inputPassword).toHaveAttribute('type', 'password');

    await userEvent.click(togglePassShow);

    expect(inputPassword).toHaveAttribute('type', 'text');

    const togglePass = getByTestId('toggle-pass');

    await userEvent.click(togglePass);

    expect(inputPassword).toHaveAttribute('type', 'password');
  });
});
