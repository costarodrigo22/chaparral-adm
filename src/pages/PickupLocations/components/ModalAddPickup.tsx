import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';
import { InfoIcon, MapPinIcon } from 'lucide-react';
import useModalAddPickup, { IModalAddPickup } from './useModalAddPickup';
import { Button } from '@/components/ui/Button';

export default function ModalAddPickup({ onClose, open }: IModalAddPickup) {
  const {
    HandleAddPickup,
    cancelReq,
    errors,
    handleSubmit,
    isLoading,
    isPending,
    register,
  } = useModalAddPickup({ open, onClose });

  return (
    <Dialog open={open} onOpenChange={cancelReq}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto overflow-x-auto">
        <DialogHeader>
          <DialogTitle>Detalhes</DialogTitle>
        </DialogHeader>
        <Separator />
        <section>
          <form
            className="flex gap-7 w-full flex-col"
            onSubmit={handleSubmit(HandleAddPickup)}
          >
            <div className="flex items-center gap-3">
              <InfoIcon
                size={24}
                className="text-[#2B0036] dark:text-[#d56bf0]"
              />
              <span>Informações</span>
            </div>

            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                {...register('name')}
                id="name"
                placeholder="Nome da empresa"
              />
              {errors.name && (
                <span className="text-red-400 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <MapPinIcon
                size={24}
                className="text-[#2B0036] dark:text-[#d56bf0]"
              />
              <span>Endereço</span>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" placeholder="Rua" {...register('street')} />
              {errors.street && (
                <span className="text-red-400 text-xs">
                  {errors.street.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[27px]">
              <div className="flex flex-col gap-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  placeholder="Número"
                  {...register('number')}
                />
                {errors.number && (
                  <span className="text-red-400 text-xs">
                    {errors.number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  placeholder="Bairro"
                  {...register('neighborhood')}
                />
                {errors.neighborhood && (
                  <span className="text-red-400 text-xs">
                    {errors.neighborhood.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade" {...register('city')} />
                {errors.city && (
                  <span className="text-red-400 text-xs">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="CEP" {...register('cep')} />
                {errors.cep && (
                  <span className="text-red-400 text-xs">
                    {errors.cep.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" placeholder="UF" {...register('uf')} />
                {errors.uf && (
                  <span className="text-red-400 text-xs">
                    {errors.uf.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telephone_number">Telefone</Label>
                <Input
                  id="telephone_number"
                  placeholder="Telefone"
                  {...register('telephone_number')}
                />
                {errors.telephone_number && (
                  <span className="text-red-400 text-xs">
                    {errors.telephone_number.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="operational_time">Horário de Funcionamento</Label>
              <Input
                id="operational_time"
                placeholder="Ex: Segunda à Sexta das 08:00 às 18:00"
                {...register('operational_time')}
              />
              {errors.operational_time && (
                <span className="text-red-400 text-xs">
                  {errors.operational_time.message}
                </span>
              )}
            </div>
            <div className="w-full justify-end flex">
              <Button disabled={isLoading || isPending}>Registrar</Button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
