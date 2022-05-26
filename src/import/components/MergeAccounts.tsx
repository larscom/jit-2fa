import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { ImportContext } from '$import/contexts/import';
import { Group, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

const getUniqueSecrets = (a: IAccount[], b: IAccount[]) => [...new Set([...a, ...b].map(({ secret }) => secret))];

function MergeAccounts() {
  const { accounts, setAccounts, favorites, setFavorites } = useContext(AccountsContext);
  const { importedAccounts, selectedUuids, importStrategy, importedFavorites } = useContext(ImportContext);
  const [merged, setMerged] = useState(false);

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

        throw Error('Something weird happened while merging accounts');
      });

      setFavorites(
        [...new Set([...favorites, ...importedFavorites])].filter((favorite) =>
          mergedAccounts.map(({ uuid }) => uuid).includes(favorite)
        )
      );
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

        throw Error('Something weird happened while merging accounts');
      });

      setFavorites(
        [...new Set([...favorites, ...importedFavorites])].filter((favorite) =>
          mergedAccounts.map(({ uuid }) => uuid).includes(favorite)
        )
      );
      setAccounts(mergedAccounts);
    }

    setMerged(true);
  }, []);

  return (
    <Group position="center" mt={10}>
      <Text>{merged ? 'Your accounts have been imported successfully!' : 'Busy importing accounts...'}</Text>
    </Group>
  );
}

export default MergeAccounts;
