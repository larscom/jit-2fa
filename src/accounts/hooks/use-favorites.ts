import { useLocalStorage } from '@mantine/hooks';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: 'favorites',
    defaultValue: []
  });

  return [favorites, setFavorites] as const;
}
