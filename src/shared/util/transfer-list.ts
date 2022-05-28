import { IAccount } from '$accounts/models/account';
import { TransferListItem } from '@mantine/core';

export const sortByLabel = ({ label: labelA }: TransferListItem, { label: labelB }: TransferListItem) =>
  labelA.localeCompare(labelB);

export const toTransferListItem = ({ uuid: value, issuer, label }: IAccount): TransferListItem => ({
  value,
  label: `${issuer} | ${label}`
});
