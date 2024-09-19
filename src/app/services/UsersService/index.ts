import { addUsers } from './addUsers';
import { deleteUser } from './deleteUser';
import { updateUser } from './updateUser';
import { userEdit } from './userEdit';
import { userLogged } from './userLogged';
import { users } from './users';

export const UsersService = {
  users,
  addUsers,
  userLogged,
  userEdit,
  updateUser,
  deleteUser,
};
