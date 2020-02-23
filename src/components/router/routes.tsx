import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import NotFound from '../notFound/notFound';
import AddPatient from 'components/patient/addPatient/addPatient';
import PatientContainer from 'components/patient/patients/patientContainer';

export enum routes {
  login = '/login',
  addPatient = '/add-patient',
  patients = '/patients'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.addPatient} component={AddPatient}></Route>
      <Route exact path={routes.patients} component={PatientContainer}></Route>
      <Route path={routes.login} component={Login}></Route>
      <Route exact path='/' component={PatientContainer}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  );
};

export default Routes;
