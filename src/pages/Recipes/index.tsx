import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EyeIcon, PlusIcon, SearchIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ModalAddRecipes from './components/ModalAddRecipe';
import { ClockLoader } from 'react-spinners';
import TableApp from '@/components/Table';
import { RecipesService } from '@/app/services/RecipesService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ModalConfirm from '@/components/ModalConfirm';
import ModalEditRecipes from './components/ModalEditRecipe';

interface RecipeItem {
  id: string;
  name: string;
}

export default function Recipes() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openModalDeleteRecipe, setOpenModalDeleteRecipe] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['RECIPES'],
    queryFn: () => RecipesService.recipes(),
  });

  const headersTable = [
    { key: 'name', label: 'Nome' },
    { key: 'actions', label: 'Opções' },
  ];

  const filteredData =
    data?.data.filter((item: RecipeItem) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const {
    isPending: isPendingDeleteRecipe,
    mutateAsync: mutateAsyncDeleteRecipe,
  } = useMutation({
    mutationFn: RecipesService.deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['RECIPES'] });
      toast.success('Receita deletada com sucesso!');
    },
    onError: () => {
      toast.error('Algo deu errado ao deletar uma receita!');
    },
  });

  async function handleDeletePDV() {
    try {
      if (selectedRecipeId) {
        await mutateAsyncDeleteRecipe(selectedRecipeId);
      }
    } finally {
      setOpenModalDeleteRecipe(false);
      setSelectedRecipeId('');
    }
  }

  return (
    <section className="my-9 mx-10 flex flex-col gap-9 bg-white dark:bg-black rounded-[10px]">
      <ModalAddRecipes
        key={`${openAddModal}-${isFetching}`}
        onClose={() => setOpenAddModal(false)}
        open={openAddModal}
      />
      <ModalEditRecipes
        key={`${selectedRecipeId}-${isFetching}`}
        id={selectedRecipeId}
        onClose={() => setOpenEditModal(false)}
        open={openEditModal}
      />
      <ModalConfirm
        open={openModalDeleteRecipe}
        isLoading={isPendingDeleteRecipe}
        title="Deseja excluir?"
        description="A receita será excluída permanentemente"
        onClose={() => setOpenModalDeleteRecipe(false)}
        onExecute={handleDeletePDV}
      />
      <header className="flex justify-between bg-white dark:bg-black w-full h-auto py-9 px-8 rounded-[10px]">
        <div>
          <h2 className="text-[#1E1E1E] dark:text-[#e1e1e1] font-semibold text-lg">
            Receitas
          </h2>
          <span className="text-base text-[#898989] dark:text-[#a5a5a5] font-medium">
            Registre suas receitas
          </span>
        </div>
        <div className="flex gap-5 items-center">
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
            <span>Nova receita</span>
          </Button>
        </div>
      </header>
      <main className="w-full h-auto flex flex-col gap-4 bg-white dark:bg-black rounded-[10px]">
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center pb-10">
            <ClockLoader size={40} color="#ff0000" />
          </div>
        ) : filteredData.length > 0 ? (
          <TableApp
            lastPage={data?.last_page || 1}
            loading={isFetching}
            paginationURL="/api/without/recipes_cards/get_list?page"
            dataTable={filteredData}
            headersTable={headersTable}
            actions={[
              {
                icon: <EyeIcon size={18} className="mr-2 cursor-pointer" />,
                onAction: info => {
                  setSelectedRecipeId(info.id);
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
                  setSelectedRecipeId(info.id);
                  setOpenModalDeleteRecipe(true);
                },
              },
            ]}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>Nenhuma receita encontrada.</p>
          </div>
        )}
      </main>
    </section>
  );
}
