import React, { useEffect } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Modal } from '../components';
import Auth from '../feature/authentication';
import AddValuteForm from '../feature/addValuteForm';
import BuyCurrencyForm from '../feature/buyCurrencyForm';

const modalsContent: {
  [key: string]: { title: string; content: JSX.Element };
} = {
  login: { title: 'Войти', content: <Auth /> },
  addWallet: { title: 'Добавить счет', content: <AddValuteForm /> },
  buyCurrency: { title: 'Пополнить счет', content: <BuyCurrencyForm /> },
};

const Layout = React.memo(() => {
  const location = useLocation();
  const { pathname } = location;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <>
      <Outlet />
      <Modal
        textTitle={
          searchParams.get('modal') !== null
            ? modalsContent[searchParams.get('modal') as string].title
            : ''
        }
        open={!!searchParams.get('modal')}
        handleClose={() => {
          searchParams.delete('modal');
          setSearchParams(searchParams);
        }}
        viewClose="cross"
      >
        {searchParams.get('modal') !== null ? (
          modalsContent[searchParams.get('modal') as string].content
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
});

export default Layout;
