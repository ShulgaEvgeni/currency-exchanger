import { RouteObject } from 'react-router-dom';

import AuthorizationLayout from '../layout/authorization';

import Authentication from '../pages/authentication'

const routes: RouteObject = {
  path: '/authentication',
  element: <AuthorizationLayout />,
  children: [
    {
      path: '',
      element: <Authentication />,
    },
  ],
};

export default routes;
