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
  onSearch: (searchTerm: string) => void;
  total: number;
}

function SearchAccount({ onSearch, total }: SearchAccountProps) {
  const { classes } = useStyles();

  const [value, setValue] = useState('');
  const [debouncedValue] = useDebouncedValue(value, 200, { leading: true });

  useEffect(() => onSearch(debouncedValue), [debouncedValue]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setValue(value);

  return (
    <Input
      className={classes.root}
      autoFocus
      onChange={handleChange}
      icon={<IconSearch />}
      placeholder={`Search ${total} accounts`}
    />
  );
}

export default SearchAccount;
