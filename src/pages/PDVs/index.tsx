import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EyeIcon, PlusIcon, SearchIcon, Trash2 } from 'lucide-react';
import ModalAddPDVs from './components/ModalAddPDVs';
import { ClockLoader } from 'react-spinners';
import TableApp from '@/components/Table';
import ModalEditPDV from './components/ModalEditPDV';
import ModalConfirm from '@/components/ModalConfirm';
import usePDVs from './usePDVs';

export default function PDVs() {
  const {
    filteredData,
    handleDeletePDV,
    id,
    data,
    setOpenModalDeletePDV,
    searchTerm,
    headersTable,
    isFetching,
    isPendingDeletePdv,
    openAddModal,
    openEditModal,
    openModalDeletePDV,
    setId,
    setOpenAddModal,
    setOpenEditModal,
    setSearchTerm,
  } = usePDVs();

  return (
    <section className="my-9 mx-10 flex flex-col gap-9 bg-white dark:bg-black rounded-[10px]">
      <ModalAddPDVs
        onClose={() => {
          setOpenAddModal(false);
        }}
        open={openAddModal}
      />
      <ModalEditPDV
        id={id}
        onClose={() => {
          setOpenEditModal(false);
        }}
        open={openEditModal}
        key={`${id}-${isFetching}`}
      />

      <ModalConfirm
        open={openModalDeletePDV}
        isLoading={isPendingDeletePdv}
        title="Deseja excluir?"
        description="O PDV será excluído permanentemente"
        onClose={() => {
          setOpenModalDeletePDV(false);
        }}
        onExecute={handleDeletePDV}
        key={id}
      />

      <header className="flex justify-between bg-white dark:bg-black w-full h-auto py-9 px-8 rounded-[10px] shadow-sections dark:shadow-sectionsDark">
        <div>
          <h2 className="text-[#1E1E1E] dark:text-[#e1e1e1] font-semibold text-lg">
            PDVs
          </h2>
          <span className="text-base text-[#898989] dark:text-[#a5a5a5] font-medium">
            Registre seus pontos de vendas
          </span>
        </div>
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
          <Button onClick={() => setOpenAddModal(true)}>
            <PlusIcon size={20} />
            <span>Novo PDV</span>
          </Button>
        </div>
      </header>
      <main className="w-full h-auto flex flex-col gap-4 dark:bg-black py-3 rounded-[10px] ">
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClockLoader color="#898989" size={30} />
          </div>
        ) : data ? (
          <TableApp
            lastPage={data.meta.last_page}
            loading={isFetching}
            paginationURL="/api/without/partners/get_all_paginated?page"
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
                  setOpenModalDeletePDV(true);
                },
              },
            ]}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>Nenhum dado encontrado</p>
          </div>
        )}
      </main>
    </section>
  );
}
