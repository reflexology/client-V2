import { PatientsProvider } from 'contexts/patientsContexts';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from 'services/authService';

import { routes } from './routes';

const ProtectedRoute = ({ component: Component, render, ...rest }: RouteProps) => {
  return (
    <PatientsProvider>
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
    </PatientsProvider>
  );
};

export default ProtectedRoute;
