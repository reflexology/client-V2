import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useInitialAtoms from 'hooks/useInitialAtoms';
import AuthService from 'services/authService';
import { routes } from './routes';

const ProtectedRoute = ({ component: Component, render, ...rest }: RouteProps) => {
  useInitialAtoms();

  return (
    <Route
      {...rest}
      render={props => {
        if (AuthService.isAuthorized()) {
          return Component ? <Component {...props} /> : render ? render(props) : null;
        } else {
          return <Redirect to={{ pathname: routes.login, state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
