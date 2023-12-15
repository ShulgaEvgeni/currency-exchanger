import React from 'react';
import { Outlet } from 'react-router-dom';
// import Menu from '@components/menu';
// import Header from '@components/header';
// import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import $ from './style.module.scss';

const layout = React.memo(() => {
  return (
    <main className={$.layout}>
      <Outlet />
    </main>
  );
});
export default layout;
