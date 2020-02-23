import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Login from '../login/login';

export enum routes {
  login = '/login'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      {/* <Route exact path='/' component={Login}></Route> */}
      {/* <Route path={routes.login} component={Login}></Route> */}
    </Switch>
  );
};

export default Routes;
