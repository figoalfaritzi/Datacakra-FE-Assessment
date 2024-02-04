import { useCallback, useEffect, useLayoutEffect, useState } from "react";

// https://medium.com/@kelvinekrresa/mastering-localstorage-management-with-react-hooks-b4268b7f9ceb

const parseJSON = (value: string) =>
  value === "undefined" ? undefined : JSON.parse(value);

const usePersistedState = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T | undefined>(() => initialValue);

  useLayoutEffect(() => {
    let initVal;
    try {
      const localStorageValue = localStorage.getItem(key);
      initVal =
        localStorageValue !== null ? parseJSON(localStorageValue) : initVal;

      setValue(initVal);
    } catch (error) {
      setValue(initVal);
    }
  }, [key]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        const newValue =
          e.newValue !== null ? parseJSON(e.newValue) : undefined;
        setValue(newValue);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  const set = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        /* empty */
      }
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      setValue(undefined);
      localStorage.removeItem(key);
    } catch (error) {
      /* empty */
    }
  }, [key]);

  return [value, set, remove] as const;
};

export default usePersistedState;
