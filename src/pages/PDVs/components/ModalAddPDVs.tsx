// import FileUploader from '@/components/FileUploader';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';
import { Info, MapPinIcon } from 'lucide-react';
import useModalAddPDVs from './useModalAddPDVs';

interface IModalAddPDVs {
  open: boolean;
  onClose: () => void;
}

export default function ModalAddPDVs({ onClose, open }: IModalAddPDVs) {
  const { errors, handleSubmit, isPending, register } =
    useModalAddPDVs(onClose);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[1004px]">
        <DialogHeader>
          <DialogTitle>Novo PDV</DialogTitle>
        </DialogHeader>

        <Separator />

        <section className="">
          <form onSubmit={handleSubmit} className="flex gap-7 w-full">
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Info
                  size={18}
                  className="text-[#2B0036] dark:text-[#b640d3]"
                />

                <span className="text-sm font-medium text-[#1E1E1E] dark:text-white">
                  Informações
                </span>
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="Nome">Nome</Label>
                <Input
                  type="text"
                  {...register('title')}
                  id="Nome"
                  placeholder="Nome"
                />
                {errors.title && (
                  <span className="text-red-400 text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon
                  size={20}
                  className="text-[#2B0036] dark:text-[#b640d3]"
                />
                <span className="text-sm font-medium text-[#1E1E1E] dark:text-white">
                  Endereço
                </span>
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="Rua">Rua</Label>
                <Input
                  type="text"
                  {...register('street')}
                  id="Rua"
                  placeholder="Rua"
                />
                {errors.street && (
                  <span className="text-red-400 text-xs">
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div className="flex gap-5">
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="Número">Número</Label>
                  <Input
                    type="text"
                    {...register('number')}
                    id="Número"
                    placeholder="Número"
                  />
                  {errors.number && (
                    <span className="text-red-400 text-xs">
                      {errors.number.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="Bairro">Bairro</Label>
                  <Input
                    type="text"
                    {...register('neighborhood')}
                    id="Bairro"
                    placeholder="Bairro"
                  />
                  {errors.neighborhood && (
                    <span className="text-red-400 text-xs">
                      {errors.neighborhood.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="Cidade">Cidade</Label>
                <Input
                  type="text"
                  {...register('city')}
                  id="Cidade"
                  placeholder="Cidade"
                />
                {errors.city && (
                  <span className="text-red-400 text-xs">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div className="flex gap-5">
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="CEP">CEP</Label>
                  <Input
                    type="text"
                    {...register('cep')}
                    id="CEP"
                    placeholder="CEP"
                  />
                  {errors.cep && (
                    <span className="text-red-400 text-xs">
                      {errors.cep.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="UF">UF</Label>
                  <Input
                    type="text"
                    {...register('uf')}
                    id="UF"
                    placeholder="UF"
                  />
                  {errors.uf && (
                    <span className="text-red-400 text-xs">
                      {errors.uf.message}
                    </span>
                  )}
                </div>
              </div>
            </section>
            <div className="mt-2 w-[60%] flex flex-col justify-between">
              {/* <FileUploader
                height={328}
                width={328}
                suggestedHeight={300}
                suggestedWidth={300}
                title="Imagem"
              /> */}
              <div className="flex w-full items-center justify-end gap-5">
                <Button className="bg-white hover:bg-slate-100 border border-[#E2E8F0] dark:border-[#222222] dark:bg-black dark:hover:opacity-85">
                  <span className="text-[#0F172A] dark:text-white">
                    Cancelar
                  </span>
                </Button>
                <Button disabled={isPending} type="submit">
                  <span>Registrar</span>
                </Button>
              </div>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
