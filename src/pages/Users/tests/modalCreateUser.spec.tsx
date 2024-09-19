import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, test } from 'vitest';
import ModalAddUsers from '../components/ModalAddUsers';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

// const createUserMock = vi.fn().mockImplementation(() => {
//   useMutation({ mutationFn: UsersService.addUsers });
// });

// vi.spyOn();

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
    // const { getByTestId, getByPlaceholderText, getByText } = render(
    //   <QueryClientProvider client={queryClient}>
    //     <ModalAddUsers open={true} onClose={() => {}} />
    //   </QueryClientProvider>,
    // );
    // const form = getByTestId('form-to-test');
    // const inputName = getByPlaceholderText('Nome');
    // const inputEmail = getByPlaceholderText('Digite seu e-mail');
    // const inputTypeProfile = 'Administrador';
    // const inputPassword = getByPlaceholderText('******');
    // await userEvent.type(inputName, 'Rodrigo Costa');
    // await userEvent.type(inputEmail, 'costarodrigo22@gmail.com');
    // await userEvent.type(inputPassword, '123123');
    // fireEvent.submit(form);
    // expect(createUserMock).toHaveBeenCalled();
    // expect(createUserMock).toHaveBeenCalledWith({
    //   name: 'Rodrigo Costa',
    //   email: 'costarodrigo22@gmail.com',
    //   plassword: '123123',
    //   profile_id: inputTypeProfile,
    // });
  });
});
