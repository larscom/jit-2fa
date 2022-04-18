import { ISearchFilters } from '$accounts/models/search-filters';
import { useSessionStorage } from '$core/hooks/use-session-storage';
import { Group, Input, Switch } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface SearchAccountProps {
  onFilterChange: (filters: ISearchFilters) => void;
}

function SearchAccount({ onFilterChange }: SearchAccountProps) {
  const [{ searchTerm, favoritesChecked }, setSearchFilters] = useSessionStorage<ISearchFilters>({
    key: 'search-filters',
    defaultValue: {
      searchTerm: '',
      favoritesChecked: false
    }
  });

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm] = useDebouncedValue(localSearchTerm, 200, { leading: true });

  const [localFavoritesChecked, setLocalFavoritesChecked] = useState(favoritesChecked);

  useEffect(() => {
    const filters = {
      favoritesChecked: localFavoritesChecked,
      searchTerm: debouncedSearchTerm
    };
    setSearchFilters(filters);
    onFilterChange(filters);
  }, [debouncedSearchTerm, localFavoritesChecked, setSearchFilters, onFilterChange]);

  return (
    <Group grow>
      <Group>
        <Input
          value={localSearchTerm}
          onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setLocalSearchTerm(value)}
          icon={<IconSearch />}
          placeholder={localFavoritesChecked ? 'Search favorites only...' : 'Search all accounts...'}
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
