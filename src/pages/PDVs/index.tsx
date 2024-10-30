import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlusIcon, SearchIcon, StoreIcon } from 'lucide-react';
import ModalAddPDVs from './components/ModalAddPDVs';
import { useState } from 'react';
import SectionsEditAccordion from '@/components/ui/SectionsEditAccordion';
import { ClipLoader } from 'react-spinners';

export default function PDVs() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const mock = [
    { id: 1, nome: 'Casa do morango 1' },
    { id: 2, nome: 'Casa do morango 2' },
    { id: 3, nome: 'Lanchonete K’delícia - Honda Motoca' },
  ];
  return (
    <section className=" my-9 mx-10 flex flex-col gap-9">
      <ModalAddPDVs
        onClose={() => setOpenAddModal(false)}
        open={openAddModal}
      />

      <header className="flex justify-between bg-white dark:bg-black w-full h-auto py-9 px-8 rounded-[10px] shadow-sections dark:shadow-sectionsDark">
        <div>
          <h2 className=" text-[#1E1E1E] dark:text-[#e1e1e1] font-semibold text-lg">
            PDVs
          </h2>
          <span className=" text-base text-[#898989] dark:text-[#a5a5a5] font-medium">
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
            />
          </div>
          <Button onClick={() => setOpenAddModal(true)}>
            <PlusIcon size={20} />
            <span>Novo PDV</span>
          </Button>
        </div>
      </header>
      <main className="w-full h-auto flex flex-col gap-4">
        {mock ? (
          mock.map(data => (
            <SectionsEditAccordion
              icon={<StoreIcon className="text-[#2B0036] dark:text-white" />}
              key={data.nome}
              title={data.nome}
            >
              teste
            </SectionsEditAccordion>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={100} color="#ff0000" />
          </div>
        )}
      </main>
    </section>
  );
}
