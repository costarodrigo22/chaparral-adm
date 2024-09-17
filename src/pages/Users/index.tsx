import TableApp from '@/components/Table';
import { Button } from '@/components/ui/Button';
import Wrapper from '@/components/Wrapper';
import { EyeIcon, PlusIcon, Search, TrashIcon } from 'lucide-react';

export default function Users() {
  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'age', label: 'Idade' },
    { key: 'address', label: 'Endereço' },
    { key: 'actions', label: 'Ações' },
  ];

  const data = [
    {
      name: 'Rodrigo',
      age: 26,
      address: 'Rua das laranjeiras',
    },
    {
      name: 'Rodrigo',
      age: 26,
      address: 'Rua das laranjeiras',
    },
    {
      name: 'Rodrigo',
      age: 26,
      address: 'Rua das laranjeiras',
    },
  ];

  return (
    <Wrapper>
      <div className="w-full p-6 flex items-center justify-between">
        <span className="font-medium">Usuários</span>

        <div className="flex gap-4">
          <div className="flex items-center justify-center border border-input bg-background rounded-md px-3">
            <Search color="#898989" size={16} />

            <input
              placeholder="Pesquisar"
              className="text px-3 py-2 text-sm ring-offset-background outline-none text-muted-foreground"
            />
          </div>

          <Button>
            <PlusIcon className="mr-2" />

            <span>Novo usuário</span>
          </Button>
        </div>
      </div>

      <TableApp
        loading={false}
        dataTable={data}
        lastPage={3}
        headersTable={headersTable}
        paginationURL="/api/stock/brand?page"
        actions={[
          {
            icon: <EyeIcon className="w-4 mr-2 cursor-pointer" />,
            onAction: info => console.log(info.id),
          },
          // {
          //   icon: <EditIcon className="w-3 mr-2 cursor-pointer" />,
          //   onAction: (info) => console.log(info),
          // },
          {
            icon: <TrashIcon className="w-3 cursor-pointer" stroke="#F00" />,
            onAction: info => console.log(info.id),
          },
        ]}
      />
    </Wrapper>
  );
}
