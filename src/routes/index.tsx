import { useRoutes } from 'react-router-dom';

import MainRoutes from './mainRoutes';
import AuthorizationRoutes from './authorizationRoutes';

import GeneralLayout from '../layout/general';

const Roures = () =>
useRoutes([
  {
    path: '/',
    element: <GeneralLayout />,
    children: [MainRoutes, AuthorizationRoutes],
  },
]);

export default Roures
