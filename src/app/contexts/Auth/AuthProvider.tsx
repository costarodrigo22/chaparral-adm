import { localStorageKeys } from '@/app/config/localStorageKeys';
import { UsersService } from '@/app/services/UsersService';
import { IUsers } from '@/app/services/UsersService/userLogged';
import SplashScreen from '@/components/SplashScreen';
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IAuthContext {
  userLogged: IUsers;
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userLoggedNow, setUserLoggedNow] = useState<IUsers>({} as IUsers);

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const { data, isError, isFetching, isSuccess } = useQuery({
    queryKey: ['userrLogged'],
    queryFn: () => UsersService.userLogged(),
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

    if (isSuccess) {
      setUserLoggedNow({
        data: data,
      });
    }
  }, [isError, isSuccess, data, signout]);

  if (isFetching) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        userLogged: userLoggedNow,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
