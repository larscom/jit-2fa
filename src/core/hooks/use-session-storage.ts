import { useWindowEvent } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';

interface UseSessionStorage<T> {
  key: string;
  defaultValue?: T;
  serialize?(value: T): string;
  deserialize?(value?: string): T;
}

function serializeJSON<T>(value: T) {
  try {
    return JSON.stringify(value);
  } catch (error: any) {
    throw new Error(`Failed to serialize the value`, { cause: error });
  }
}

function deserializeJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function useSessionStorage<T = string>({
  key,
  defaultValue,
  deserialize = deserializeJSON,
  serialize = serializeJSON
}: UseSessionStorage<T>) {
  const [value, setValue] = useState<T>(
    typeof window !== 'undefined' && 'localStorage' in window
      ? deserialize(window.sessionStorage.getItem(key) ?? undefined)
      : ((defaultValue ?? '') as T)
  );

  const setSessionStorageValue = useCallback(
    (val: T | ((prevState: T) => T)) => {
      if (val instanceof Function) {
        setValue((current) => {
          const result = val(current);
          window.sessionStorage.setItem(key, serialize(result));
          return result;
        });
      } else {
        window.sessionStorage.setItem(key, serialize(val));
        setValue(val);
      }
    },
    [key]
  );

  useWindowEvent('storage', (event) => {
    if (event.storageArea === window.sessionStorage && event.key === key) {
      setValue(deserialize(event.newValue ?? undefined));
    }
  });

  useEffect(() => {
    if (defaultValue !== undefined && value === undefined) {
      setSessionStorageValue(defaultValue);
    }
  }, [defaultValue, value, setSessionStorageValue]);

  return [value === undefined ? defaultValue : value, setSessionStorageValue] as const;
}
