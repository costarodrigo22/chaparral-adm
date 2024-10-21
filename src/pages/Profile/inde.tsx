import { useAuth } from '@/app/hooks/useAuth';
import InputImage from '@/components/InputImage';
import { Button } from '@/components/ui/Button';
import Wrapper from '@/components/Wrapper';
import { Edit } from 'lucide-react';
import ModalEditUser from './components/ModalEditUser';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const { userLogged } = useAuth();

  async function getProducts() {
    const body = {
      call: 'ListarPosEstoque',
      app_key: '4843986822675',
      app_secret: '9a58d29f2688072ccb71a0970d16882f',
      param: [
        {
          nPagina: 1,
          nRegPorPagina: 50,
          dDataPosicao: '14/10/2024',
          cExibeTodos: 'N',
          codigo_local_estoque: 0,
        },
      ],
    };

    const response = await axios.post(
      'https://app.omie.com.br/api/v1/estoque/consulta/',
      body,
    );

    console.log('procutos: ', response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Wrapper>
      <ModalEditUser
        key={userLogged.data?.image}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="p-6 flex justify-between">
        <div>
          <InputImage idUserLogged={userLogged.data?.id} />

          <span className="font-bold flex mt-10">
            Nome:{' '}
            <p className="font-normal ml-2 text-gray-400">
              {userLogged.data?.name}
            </p>
          </span>

          <span className="font-bold flex mt-10">
            Perfil:{' '}
            <p className="font-normal ml-2 text-gray-400">
              {userLogged.data?.profile?.name}
            </p>
          </span>

          <span className="font-bold flex mt-10">
            E-mail:{' '}
            <p className="font-normal ml-2 text-gray-400">
              {userLogged.data?.email}
            </p>
          </span>

          <span className="font-bold flex mt-10">
            Senha: <p className="font-normal ml-2 text-gray-400">*****</p>
          </span>
        </div>

        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          <Edit className="mr-2" size={20} />
          Editar
        </Button>
      </div>
    </Wrapper>
  );
}
