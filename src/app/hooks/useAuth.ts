import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
