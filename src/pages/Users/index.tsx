import TableApp from '@/components/Table';
import { Button } from '@/components/ui/Button';
import Wrapper from '@/components/Wrapper';
import { EyeIcon, PlusIcon, Search, Trash2 } from 'lucide-react';
import { useUsers } from './useUsers';
import ModalAddUsers from './components/ModalAddUsers';
import ModalEditUsers from './components/ModalEditUsers';
import ModalConfirm from '@/components/ModalConfirm';
import useFilter from '@/app/hooks/useFilter';

export default function Users() {
  const {
    headersTable,
    data,
    openModalAddUsers,
    openModalEditUsers,
    isFetching,
    dataUserEdit,
    isPending,
    modalDeleteUsers,
    isPendingDeleteUser,
    handleCloseModalEditUsers,
    handleOpenModalEditUsers,
    handleCloseModalAddUsers,
    handleOpenModalAddUsers,
    handleCloseModalDeleteUser,
    handleOpenModalDeleteUser,
    handleDeleteUser,
  } = useUsers();

  const { filteredList, handleChangeSearchTerm } = useFilter(
    data ?? [],
    'name',
  );

  return (
    <Wrapper>
      <ModalAddUsers
        open={openModalAddUsers}
        onClose={handleCloseModalAddUsers}
      />

      <ModalEditUsers
        open={openModalEditUsers}
        dataEdit={dataUserEdit}
        isLoading={isPending}
        onClose={handleCloseModalEditUsers}
      />

      <ModalConfirm
        open={modalDeleteUsers}
        isLoading={isPendingDeleteUser}
        title="Deseja excluir?"
        description="O usuário será excluído permanentemente"
        onClose={handleCloseModalDeleteUser}
        onExecute={handleDeleteUser}
      />

      <div className="w-full p-6 flex items-center justify-between">
        <span className="font-medium">Usuários</span>

        <div className="flex gap-4">
          <div className="flex items-center justify-center border border-input bg-background rounded-md px-3">
            <Search color="#898989" size={16} />

            <input
              onChange={handleChangeSearchTerm}
              placeholder="Pesquisar"
              className="text px-3 py-1 text-sm ring-offset-background outline-none text-muted-foreground"
            />
          </div>

          <Button
            onClick={handleOpenModalAddUsers}
            className="text-xs"
            size="sm"
            data-testid="btn-new-user"
          >
            <PlusIcon className="mr-2" size={16} />
            Novo usuário
          </Button>
        </div>
      </div>

      <TableApp
        loading={isFetching}
        dataTable={filteredList ? filteredList : []}
        lastPage={3}
        headersTable={headersTable}
        paginationURL=""
        actions={[
          {
            icon: (
              <EyeIcon
                size={18}
                className="mr-2 cursor-pointer"
                stroke="#1E1E1E"
              />
            ),
            onAction: info => handleOpenModalEditUsers(info.id),
          },
          {
            icon: (
              <Trash2 size={18} className="cursor-pointer" stroke="#FF3737" />
            ),
            onAction: info => handleOpenModalDeleteUser(info.id),
          },
        ]}
      />
    </Wrapper>
  );
}
