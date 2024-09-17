import { localStorageKeys } from '@/app/config/localStorageKeys';
import { UsersService } from '@/app/services/UsersService';
import SplashScreen from '@/components/SplashScreen';
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IAuthContext {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.users(),
    enabled: signedIn,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      signout();

      toast.error('Sua sessão expirou');
    }
  }, [isError, signout]);

  if (isFetching) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
