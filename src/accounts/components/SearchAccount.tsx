import { ISearchFilters } from '$accounts/models/search-filters';
import { useSessionStorage } from '$core/hooks/use-session-storage';
import { createStyles, Group, Input, Switch } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    width: theme.breakpoints.xs / 2
  }
}));

interface SearchAccountProps {
  total: number;
  onFilterChange: (filters: ISearchFilters) => void;
}

function SearchAccount({ total, onFilterChange }: SearchAccountProps) {
  const { classes } = useStyles();

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
      <Group position="right">
        <Input
          className={classes.root}
          value={localSearchTerm}
          onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setLocalSearchTerm(value)}
          icon={<IconSearch />}
          placeholder={`Search ${total} accounts`}
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
