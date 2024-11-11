import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import { Button } from '@/components/ui/Button';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { RocketIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ClockLoader } from 'react-spinners';
import { toast } from 'sonner';
import { z } from 'zod';

export default function MissionValues() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);

  function handleToggleIsTitleEditable() {
    setIsTitleEditable(!isTitleEditable);
  }

  function handleToggleIsDescEditable() {
    setIsDescEditable(!isDescEditable);
  }

  const schema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });

  async function handleSendData(data: FormData) {
    setIsLoading(true);
    try {
      console.log('Enviando dados:', data);
      setIsTitleEditable(false);
      setIsDescEditable(false);
      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast.error('Ocorreu um erro ao atualizar os dados!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SectionsEditWrapper title="Missão e Valores">
      <form onSubmit={hookFormHandleSubmit(handleSendData)}>
        <div className="flex w-full flex-col h-full gap-9">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputTypeWYSIWYG
                isEditable={isTitleEditable}
                onIsEditable={handleToggleIsTitleEditable}
                showEditButton
                actualValue={value}
                onContentChange={onChange}
                title="Título"
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 mt-[-50px]">{errors.title.message}</p>
          )}
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputTypeWYSIWYG
                isEditable={isDescEditable}
                onIsEditable={handleToggleIsDescEditable}
                showEditButton
                actualValue={value}
                onContentChange={onChange}
                title="Descrição"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 mt-[-50px]">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="w-full flex items-center justify-end mt-9">
          <Button
            className="flex gap-3 items-center"
            onClick={hookFormHandleSubmit(handleSendData)}
            disabled={
              isLoading || !(isTitleEditable || isDescEditable) || !isValid
            }
          >
            {!isLoading ? (
              <>
                <RocketIcon size={20} />
                <span>Publicar</span>
              </>
            ) : (
              <ClockLoader size={20} color="red" />
            )}
          </Button>
        </div>
      </form>
    </SectionsEditWrapper>
  );
}
