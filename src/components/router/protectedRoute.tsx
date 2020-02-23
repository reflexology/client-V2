import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import JwtService from 'services/authService';
import { routes } from './routes';

const ProtectedRoute = ({ component: Component, render, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!!JwtService.getAccessToken()) {
          return Component ? <Component {...props} /> : render ? render(props) : null;
        } else {
          return <Redirect to={{ pathname: routes.login, state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
