import { IAccount } from '$accounts/models/account';
import PageTitle from '$core/components/PageTitle';
import { AccountsContext } from '$core/contexts/accounts';
import ExportProcess from '$export/components/ExportProcess';
import { ExportContextProvider } from '$export/contexts/export';
import { useContext, useState } from 'react';

// const sortByLabel = ({ label: labelA }: TransferListItem, { label: labelB }: TransferListItem) =>
//   labelA.localeCompare(labelB);

function Export() {
  const [exportedAccounts, setExportedAccounts] = useState<IAccount[]>([]);
  const { account, accounts } = useContext(AccountsContext);

  // const [data, setData] = useState<TransferListData>([
  //   accounts.map((a) => ({ value: a.uuid, label: `${a.issuer} | ${a.label}` })).sort(sortByLabel),
  //   []
  // ]);

  // const handleChange = (data: TransferListData) => {
  //   const [unselected, selected] = data;
  //   setData([unselected.sort(sortByLabel), selected.sort(sortByLabel)]);
  // };

  return (
    <>
      <PageTitle title="Export" />
      <ExportProcess />
      {/* <MyStepper next={data[1].length > 0}>
        <TransferList
        listHeight={500}
        value={data}
        onChange={handleChange}
        searchPlaceholder="Search accounts..."
        nothingFound="No accounts selected yet"
        breakpoint="sm"
        />
      </MyStepper> */}
    </>
  );
}

export default Export;
