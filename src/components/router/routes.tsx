import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import NotFound from '../notFound/notFound';
import AddPatient from 'components/patient/addPatient/addPatient';

export enum routes {
  login = '/login',
  addPatient = '/add-patient'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route exact path={routes.addPatient} component={AddPatient}></Route>
      <Route path={routes.login} component={Login}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  );
};

export default Routes;
