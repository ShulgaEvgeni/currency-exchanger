import React from 'react';
import { RouteObject } from 'react-router-dom';

import MainLayout from '../layout/main';

import Main from '../pages/main'

const routes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Main />
    },
  ],
};

export default routes;
