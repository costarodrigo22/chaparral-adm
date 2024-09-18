import TableApp from '@/components/Table';
import { Button } from '@/components/ui/Button';
import Wrapper from '@/components/Wrapper';
import { EyeIcon, PlusIcon, Search, TrashIcon } from 'lucide-react';
import { useUsers } from './useUsers';
import ModalAddUsers from './components/ModalAddUsers';
import ModalEditUsers from './components/ModalEditUsers';

export default function Users() {
  const {
    headersTable,
    data,
    openModalAddUsers,
    openModalEditUsers,
    handleCloseModalEditUsers,
    handleOpenModalEditUsers,
    handleCloseModalAddUsers,
    handleOpenModalAddUsers,
  } = useUsers();

  return (
    <Wrapper>
      <ModalAddUsers
        open={openModalAddUsers}
        onClose={handleCloseModalAddUsers}
      />

      <ModalEditUsers
        open={openModalEditUsers}
        onClose={handleCloseModalEditUsers}
      />

      <div className="w-full p-6 flex items-center justify-between">
        <span className="font-medium">Usuários</span>

        <div className="flex gap-4">
          <div className="flex items-center justify-center border border-input bg-background rounded-md px-3">
            <Search color="#898989" size={16} />

            <input
              placeholder="Pesquisar"
              className="text px-3 py-1 text-sm ring-offset-background outline-none text-muted-foreground"
            />
          </div>

          <Button
            onClick={handleOpenModalAddUsers}
            className="text-xs"
            size="sm"
          >
            <PlusIcon className="mr-2" size={16} />
            Novo usuário
          </Button>
        </div>
      </div>

      <TableApp
        loading={false}
        dataTable={data}
        lastPage={3}
        headersTable={headersTable}
        paginationURL=""
        actions={[
          {
            icon: <EyeIcon size={18} className="mr-2 cursor-pointer" />,
            onAction: info => handleOpenModalEditUsers(),
          },
          {
            icon: (
              <TrashIcon size={18} className="cursor-pointer" stroke="#F00" />
            ),
            onAction: info => console.log(info.id),
          },
        ]}
      />
    </Wrapper>
  );
}
