import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;
