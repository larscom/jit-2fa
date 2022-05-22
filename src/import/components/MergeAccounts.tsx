import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { ImportContext } from '$import/contexts/import';
import { Group, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

const getUniqueSecrets = (a: IAccount[], b: IAccount[]) => [...new Set([...a, ...b].map(({ secret }) => secret))];

function MergeAccounts() {
  const { accounts, setAccounts } = useContext(AccountsContext);
  const { restoredAccounts, importStrategy } = useContext(ImportContext);
  const [done, setDone] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // Imported accounts will replace all existing accounts
    if (importStrategy === 'replace') {
      setAccounts(restoredAccounts);
    }

    // Merge imported accounts with existing accounts, overwrite existing
    if (importStrategy === 'merge') {
      const secrets = getUniqueSecrets(accounts, restoredAccounts);
      const mergedAccounts = secrets.map((secret) => {
        const restoredAccount = restoredAccounts.find((account) => account.secret === secret);
        if (restoredAccount) return restoredAccount;

        const existingAccount = accounts.find((account) => account.secret === secret);
        if (existingAccount) return existingAccount;

        throw Error('Something weird happened while merging accounts');
      });

      setAccounts(mergedAccounts);
    }

    // Merge imported accounts with existing accounts, keep existing
    if (importStrategy === 'merge_keep') {
      const secrets = getUniqueSecrets(accounts, restoredAccounts);
      const mergedAccounts = secrets.map((secret) => {
        const existingAccount = accounts.find((account) => account.secret === secret);
        if (existingAccount) return existingAccount;

        const restoredAccount = restoredAccounts.find((account) => account.secret === secret);
        if (restoredAccount) return restoredAccount;

        throw Error('Something weird happened while merging accounts');
      });

      setAccounts(mergedAccounts);
    }

    setDone(true);
  }, []);

  return (
    <Group position="center" mt={10}>
      <Text>{done ? 'Your accounts have been imported successfully!' : 'Busy importing accounts...'}</Text>
    </Group>
  );
}

export default MergeAccounts;
