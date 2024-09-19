/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';

interface ObjectWithStringKey {
  [key: string]: any;
}

export default function useFilter<T extends ObjectWithStringKey>(
  list: T[],
  key: string,
) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredList = useMemo(
    () =>
      list.filter(item =>
        item[key]?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [list, key, searchTerm],
  );

  return { filteredList, searchTerm, handleChangeSearchTerm };
}
