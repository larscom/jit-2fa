import { createStyles, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    width: theme.breakpoints.xs / 2
  }
}));

interface SearchAccountProps {
  onSearch: (query: string) => void;
  totalAccounts: number;
}

function SearchAccount({ onSearch, totalAccounts }: SearchAccountProps) {
  const { classes } = useStyles();

  const [value, setValue] = useState('');
  const [debouncedValue] = useDebouncedValue(value, 300);

  useEffect(() => onSearch(debouncedValue), [debouncedValue]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setValue(value);

  return (
    <Input
      className={classes.root}
      autoFocus
      onChange={handleChange}
      icon={<IconSearch />}
      placeholder={totalAccounts ? `Search ${totalAccounts} accounts` : 'Search'}
    />
  );
}

export default SearchAccount;
