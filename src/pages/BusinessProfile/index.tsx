import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import SectionsEditWrapper from '@/components/ui/SectionsEditWrapper';
import { InfoIcon, PhoneIcon } from 'lucide-react';
import useBusinessProfile from './useBusinessProfile';

export default function BusinessProfile() {
  const { errors, handleSendData, handleSubmit, isDirty, isLoading, register } =
    useBusinessProfile();

  return (
    <SectionsEditWrapper title="Perfil da empresa">
      <form onSubmit={handleSubmit(handleSendData)}>
        {/* Informações da Empresa */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <InfoIcon size={25} color="#08964F" />
            <span className="font-medium text-base">Informações</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[27px]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register('informations.name')}
                placeholder="Nome da empresa"
              />
              {errors.informations?.name && (
                <span className="text-red-500 text-xs">
                  {errors.informations.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                {...register('informations.cnpj')}
                placeholder="CNPJ da empresa"
              />
              {errors.informations?.cnpj && (
                <span className="text-red-500 text-xs">
                  {errors.informations.cnpj.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                {...register('informations.street')}
                placeholder="Rua da empresa"
              />
              {errors.informations?.street && (
                <span className="text-red-500 text-xs">
                  {errors.informations.street.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                {...register('informations.number')}
                placeholder="Número"
              />
              {errors.informations?.number && (
                <span className="text-red-500 text-xs">
                  {errors.informations.number.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                {...register('informations.neighborhood')}
                placeholder="Bairro"
              />
              {errors.informations?.neighborhood && (
                <span className="text-red-500 text-xs">
                  {errors.informations.neighborhood.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                {...register('informations.city')}
                placeholder="Cidade"
              />
              {errors.informations?.city && (
                <span className="text-red-500 text-xs">
                  {errors.informations.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                {...register('informations.cep')}
                placeholder="CEP"
              />
              {errors.informations?.cep && (
                <span className="text-red-500 text-xs">
                  {errors.informations.cep.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register('informations.state')}
                placeholder="Estado"
              />
              {errors.informations?.state && (
                <span className="text-red-500 text-xs">
                  {errors.informations.state.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contatos */}
        <div className="flex flex-col gap-5 mt-8">
          <div className="flex items-center gap-3">
            <PhoneIcon size={25} color="#08964F" />
            <span className="font-medium text-base">Contatos</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[27px]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone_number">Telefone</Label>
              <Input
                id="phone_number"
                {...register('contacts.phone_number')}
                placeholder="Telefone da empresa"
              />
              {errors.contacts?.phone_number && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.phone_number.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                {...register('contacts.whatsapp')}
                placeholder="Link para WhatsApp"
              />
              {errors.contacts?.whatsapp && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.whatsapp.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                {...register('contacts.instagram')}
                placeholder="Link do Instagram"
              />
              {errors.contacts?.instagram && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.instagram.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                {...register('contacts.facebook')}
                placeholder="Link do Facebook"
              />
              {errors.contacts?.facebook && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.facebook.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('contacts.email')}
                placeholder="Email da empresa"
              />
              {errors.contacts?.email && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.email.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className=" flex justify-end">
          <Button
            type="submit"
            className="mt-6"
            disabled={!isDirty || isLoading}
          >
            Atualizar
          </Button>
        </div>
      </form>
    </SectionsEditWrapper>
  );
}
