import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { PatientsProvider } from 'contexts/patientsContexts';
import AuthService from 'services/authService';
import { routes } from './routes';
import { StoreProvider } from 'contexts/storeContext';

const ProtectedRoute = ({ component: Component, render, ...rest }: RouteProps) => {
  return (
    <StoreProvider>
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
    </StoreProvider>
  );
};

export default ProtectedRoute;
