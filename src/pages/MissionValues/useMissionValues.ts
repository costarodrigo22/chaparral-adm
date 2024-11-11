import { toast } from 'sonner';
import { z } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { httpClient } from '@/app/services/httpClient';
import { useForm } from 'react-hook-form';

interface MissionValuesResponse {
  data: {
    id: string;
    featured_description: string;
    mission_description: string;
    values_description: string;
    created_at: string;
    updated_at: string;
  };
}
export default function useMissionValues() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMissionDescEditable, setIsMissionDescEditable] = useState(false);
  const [isSubTitleEditable, setIsSubTitleEditable] = useState(false);
  const [isValuesDescEditable, setIsValuesDescEditable] = useState(false);

  const handleToggleIsMissionDescEditable = () =>
    setIsMissionDescEditable(!isMissionDescEditable);
  const handleToggleIsSubTitleEditable = () =>
    setIsSubTitleEditable(!isSubTitleEditable);
  const handleToggleIsValuesDescEditable = () =>
    setIsValuesDescEditable(!isValuesDescEditable);

  const schema = z.object({
    missionDesc: z.string().min(1, 'Descrição da missão é obrigatória'),
    subtitle: z.string().min(1, 'Subtítulo é obrigatório'),
    valuesDesc: z.string().min(1, 'Descrição dos valores é obrigatória'),
  });

  type FormData = z.infer<typeof schema>;

  const {
    reset,
    control,
    formState: { errors, isValid },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subtitle: '', missionDesc: '', valuesDesc: '' },
    mode: 'onChange',
  });

  const getAboutInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const infoRes = await httpClient.get<MissionValuesResponse>(
        '/api/without/about_mission_and_values/get',
      );
      reset({
        missionDesc: infoRes.data.data.mission_description,
        valuesDesc: infoRes.data.data.values_description,
        subtitle: infoRes.data.data.featured_description,
      });
    } catch (error) {
      toast.error('Erro ao buscar dados!');
      console.error('Erro ao buscar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    getAboutInfo();
  }, [getAboutInfo]);

  async function handleSendData(data: FormData) {
    setIsLoading(true);
    const body = {
      featured_description: data.subtitle,
      mission_description: data.missionDesc,
      values_description: data.valuesDesc,
    };
    try {
      await httpClient.put('/api/v1/about_mission_and_values/update', body);
      setIsMissionDescEditable(false);
      setIsSubTitleEditable(false);
      setIsValuesDescEditable(false);
      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast.error('Ocorreu um erro ao atualizar os dados!');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleSendData,
    control,
    errors,
    isValid,
    hookFormHandleSubmit,
    handleToggleIsMissionDescEditable,
    handleToggleIsSubTitleEditable,
    handleToggleIsValuesDescEditable,
    isLoading,
    isSubTitleEditable,
    isMissionDescEditable,
    isValuesDescEditable,
  };
}
