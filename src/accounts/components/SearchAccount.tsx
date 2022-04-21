import { useSessionStorage } from '$core/hooks/use-session-storage';
import { Group, Input, Switch } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface SearchAccountProps {
  onFavoritesChecked: (checked: boolean) => void;
  onInputChange: (searchTerm: string) => void;
}

function SearchAccount({ onFavoritesChecked, onInputChange }: SearchAccountProps) {
  const [favoritesChecked, setFavoritesChecked] = useSessionStorage({
    key: 'favorites-checked',
    defaultValue: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 200, { leading: true });
  const [localFavoritesChecked, setLocalFavoritesChecked] = useState(favoritesChecked);

  useEffect(() => {
    setFavoritesChecked(localFavoritesChecked);
    onFavoritesChecked(localFavoritesChecked);
  }, [localFavoritesChecked, onFavoritesChecked, setFavoritesChecked]);

  useEffect(() => onInputChange(debouncedSearchTerm), [debouncedSearchTerm, onInputChange]);

  return (
    <Group grow>
      <Group spacing="xs">
        <Input
          value={searchTerm}
          onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(value)}
          icon={<IconSearch />}
          placeholder={localFavoritesChecked ? 'Search favorites...' : 'Search all...'}
          autoFocus
        />
        <Switch
          label="Favorites"
          aria-label="Favorites"
          checked={localFavoritesChecked}
          onChange={({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => setLocalFavoritesChecked(checked)}
        />
      </Group>
    </Group>
  );
}

export default SearchAccount;
