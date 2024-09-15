import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import imageLogin from '@/assets/image-login.svg';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from './useLogin';

export default function Login() {
  const { showPassword, register, handleSubmit, handleShowPassword } =
    useLogin();

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <img
        src={imageLogin}
        style={{ height: '100%' }}
        className="absolute left-0"
      />
      <div className="w-full max-w-[450px] border border-slate-300 rounded-md p-7 flex items-center justify-center flex-col gap-5 z-10 bg-white">
        <div className="w-full flex flex-col justify-start">
          <span className="font-bold text-xl">LOGIN ÍAÇA</span>

          <small>
            Faça login para acessar o painel administrativo do site.
          </small>
        </div>

        <form
          onSubmit={() => handleSubmit()}
          className="w-full flex flex-col gap-3"
          data-testid="form-test"
        >
          <Label htmlFor="Usuário">Usuário</Label>
          <Input id="Usuário" {...register('cpf')} placeholder="CPF" />

          <div className="w-full relative">
            <Label htmlFor="Senha">Senha</Label>
            <Input
              id="Senha"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />

            {showPassword && (
              <EyeOff
                data-testid="toggle-pass"
                size={35}
                color="#a7a7a7"
                className="absolute top-7 right-0 items-center pr-3"
                onClick={handleShowPassword}
              />
            )}

            {!showPassword && (
              <Eye
                data-testid="toggle-pass-show"
                size={35}
                color="#a7a7a7"
                className="absolute top-7 right-0 items-center pr-3"
                onClick={handleShowPassword}
              />
            )}
          </div>

          <div className="w-full flex justify-end">
            <span className="text-sm text-black font-medium underline cursor-pointer">
              Esqueci a senha
            </span>
          </div>

          <Button type="submit">Acessar</Button>
        </form>
      </div>
    </div>
  );
}
