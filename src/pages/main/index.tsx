import { observer } from 'mobx-react-lite';

import { CurrencyTable, UserWallet } from '../../feature';

const Page = observer(() => {
  return (
    <>
      <UserWallet />
      <CurrencyTable />
    </>
  );
});

export default Page;
