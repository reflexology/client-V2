import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import NotFound from '../notFound/notFound';

export enum routes {
  login = '/login'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route path={routes.login} component={Login}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  );
};

export default Routes;
