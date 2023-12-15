import { Outlet, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import { Header, Menu } from '../../components';
import { userStore as $user } from '../../stores';
import $ from './style.module.scss';

const Layout = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Header className={$.header}>
        <Typography variant="h4">Обменник онлайн</Typography>
        <Menu>
          <Menu.MenuItem>{$user.userId === null ? 'Профиль' : $user.user?.name}</Menu.MenuItem>
          <Menu.Divider />
          {$user.userId === null ? (
            <Menu.MenuItemButton
              onClick={() => {
                searchParams.set('modal', 'login');
                setSearchParams(searchParams);
              }}
            >
              Вход
            </Menu.MenuItemButton>
          ) : (
            <Menu.MenuItemButton
              onClick={() => {
                $user.logOutUser();
              }}
            >
              Выход
            </Menu.MenuItemButton>
          )}
        </Menu>
      </Header>
      <main className={$.layout}>
        <Outlet />
      </main>
    </>
  );
});

export default Layout;
