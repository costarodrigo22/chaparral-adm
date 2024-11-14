import ModalConfirm from '@/components/ModalConfirm';
import TableApp from '@/components/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Wrapper from '@/components/Wrapper';

import { EyeIcon, PlusIcon, SearchIcon, Trash2 } from 'lucide-react';
import { ClockLoader } from 'react-spinners';
import ModalEditPickup from './components/ModalEditPickup';
import usePickupLocations from './usePickupLocations';
import ModalAddPickup from './components/ModalAddPickup';

export default function PickupLocations() {
  const {
    filteredData,
    setOpenModalDeletePickup,
    searchTerm,
    data,
    handleDeletePickup,
    headersTable,
    isFetching,
    isPendingDeletePickup,
    openEditModal,
    openModalDeletePickup,
    setId,
    setOpenEditModal,
    setSearchTerm,
    id,
    openAddPickupModal,
    setOpenAddPickupModal,
  } = usePickupLocations();

  return (
    <Wrapper>
      <ModalConfirm
        open={openModalDeletePickup}
        isLoading={isPendingDeletePickup}
        title="Deseja excluir?"
        description="O Local de retirada será excluído permanentemente"
        onClose={() => {
          setOpenModalDeletePickup(false);
        }}
        onExecute={handleDeletePickup}
        key={id}
      />
      <ModalAddPickup
        onClose={() => setOpenAddPickupModal(false)}
        open={openAddPickupModal}
      />
      {id && (
        <ModalEditPickup
          id={id}
          onClose={() => setOpenEditModal(false)}
          open={openEditModal}
          key={`${id}-${isFetching}`}
        />
      )}
      <div className="flex justify-between p-7">
        <h2>Locais de retirada</h2>
        <div>
          <div className="flex gap-5">
            <div className="w-full relative">
              <SearchIcon
                color="#898989"
                size={24}
                className="absolute top-2 left-2"
              />
              <Input
                placeholder="Pesquisar"
                className="pl-10 focus min-w-[312px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setOpenAddPickupModal(true)}>
              <PlusIcon size={20} />
              <span>Novo PDV</span>
            </Button>
          </div>
        </div>
      </div>
      <section className="w-full h-auto flex flex-col gap-4 dark:bg-black py-3 rounded-[10px]">
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClockLoader color="#898989" size={30} />
          </div>
        ) : data ? (
          <TableApp
            lastPage={data.meta.last_page}
            loading={isFetching}
            paginationURL="/api/without/pick_up_location/get_all?page"
            dataTable={filteredData}
            headersTable={headersTable}
            actions={[
              {
                icon: <EyeIcon size={18} className="mr-2 cursor-pointer" />,
                onAction: info => {
                  setId(info.id);
                  setOpenEditModal(true);
                },
              },
              {
                icon: (
                  <Trash2
                    size={18}
                    className="cursor-pointer"
                    stroke="#FF3737"
                  />
                ),
                onAction: info => {
                  setId(info.id);
                  setOpenModalDeletePickup(true);
                },
              },
            ]}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>Nenhum dado encontrado</p>
          </div>
        )}
      </section>
    </Wrapper>
  );
}
