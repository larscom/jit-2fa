import { IAccount } from '$accounts/models/account';
import AutoTransition from '$core/components/AutoTransition';
import { AccountsContext } from '$core/contexts/accounts';
import { ImportContext } from '$import/contexts/import';
import { Group, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

const getUniqueSecrets = (a: IAccount[], b: IAccount[]) => [...new Set([...a, ...b].map(({ secret }) => secret))];

const getUniqueFavorites = (a: string[], b: string[], accounts: IAccount[]) =>
  [...new Set([...a, ...b])].filter((favorite) => accounts.map(({ uuid }) => uuid).includes(favorite));

function MergeAccounts() {
  const { accounts, setAccounts, favorites, setFavorites } = useContext(AccountsContext);
  const { importedAccounts, selectedUuids, importStrategy, importedFavorites } = useContext(ImportContext);
  const [finnished, setFinnished] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const selectedAccounts = importedAccounts.filter(({ uuid }) => selectedUuids.includes(uuid));

    // Imported accounts will replace all existing accounts
    if (importStrategy === 'replace') {
      setAccounts(selectedAccounts);
      setFavorites(importedFavorites);
    }

    // Merge imported accounts with existing accounts, overwrite existing
    if (importStrategy === 'merge') {
      const secrets = getUniqueSecrets(accounts, selectedAccounts);
      const mergedAccounts = secrets.map((secret) => {
        const restoredAccount = selectedAccounts.find((account) => account.secret === secret);
        if (restoredAccount) return restoredAccount;

        const existingAccount = accounts.find((account) => account.secret === secret);
        if (existingAccount) return existingAccount;

        throw Error('Unexpected error while merging accounts');
      });

      setFavorites(getUniqueFavorites(favorites, importedFavorites, mergedAccounts));
      setAccounts(mergedAccounts);
    }

    // Merge imported accounts with existing accounts, keep existing
    if (importStrategy === 'merge_keep') {
      const secrets = getUniqueSecrets(accounts, selectedAccounts);
      const mergedAccounts = secrets.map((secret) => {
        const existingAccount = accounts.find((account) => account.secret === secret);
        if (existingAccount) return existingAccount;

        const restoredAccount = selectedAccounts.find((account) => account.secret === secret);
        if (restoredAccount) return restoredAccount;

        throw Error('Unexpected error while merging accounts');
      });

      setFavorites(getUniqueFavorites(favorites, importedFavorites, mergedAccounts));
      setAccounts(mergedAccounts);
    }

    setFinnished(true);
  }, []);

  return (
    <AutoTransition
      target={
        <Group position="center" mt={10}>
          <Text>{finnished ? 'Your accounts have been imported successfully!' : 'Busy importing accounts...'}</Text>
        </Group>
      }
    />
  );
}

export default MergeAccounts;
