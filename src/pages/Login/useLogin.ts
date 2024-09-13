import { useState } from 'react';

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  return { showPassword, handleShowPassword };
}
