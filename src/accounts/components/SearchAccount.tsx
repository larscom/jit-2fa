import { useSessionStorage } from '$core/hooks/use-session-storage';
import { Group, Input, Switch } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { memo, useCallback, useEffect, useTransition } from 'react';

interface SearchAccountProps {
  onFavoritesChecked: (checked: boolean) => void;
  onInputChange: (searchTerm: string) => void;
}

function SearchAccount({ onFavoritesChecked, onInputChange }: SearchAccountProps) {
  const [favoritesChecked, setFavoritesChecked] = useSessionStorage({
    key: 'favorites-checked',
    defaultValue: false
  });

  const startTransition = useTransition()[1];

  const placeholder = favoritesChecked ? 'Search favorites...' : 'Search all...';

  const handleSearchChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => startTransition(() => onInputChange(value)),
    [startTransition, onInputChange]
  );

  const handleFavoritesChange = useCallback(
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setFavoritesChecked(checked);
      onFavoritesChecked(checked);
    },
    [setFavoritesChecked, onFavoritesChecked]
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => onFavoritesChecked(favoritesChecked), []);

  return (
    <Group grow>
      <Group spacing="xs">
        <Input
          autoFocus
          id="search-term"
          icon={<IconSearch />}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={handleSearchChange}
        />
        <Switch
          id="switch-favorites"
          label="Favorites"
          aria-label="Favorites"
          checked={favoritesChecked}
          onChange={handleFavoritesChange}
        />
      </Group>
    </Group>
  );
}

export default memo(SearchAccount);
