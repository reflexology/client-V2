import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useInitialAtoms from 'hooks/useInitialAtoms';
import AuthService from 'services/authService';
import { routes } from './routes';

const RequireAuth: React.FC = () => {
  const location = useLocation();

  useInitialAtoms();

  if (!AuthService.isAuthorized()) {
    return <Navigate to={{ pathname: routes.login }} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
