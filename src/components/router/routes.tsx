import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import NotFound from '../notFound/notFound';
import AddPatient from 'components/patient/addPatient/addPatient';
import EditPatient from 'components/patient/editPatient/editPatient';
import PatientContainer from 'components/patient/patients/patientContainer';
import ProtectedRoute from './protectedRoute';

export enum routes {
  login = '/login',
  addPatient = '/add-patient',
  editPatient = '/edit-patient/{0}',
  patients = '/patients'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={routes.addPatient} component={AddPatient} />
      <ProtectedRoute exact path={routes.editPatient.format(':patientId')} component={EditPatient} />
      <ProtectedRoute exact path={routes.patients} component={PatientContainer} />
      <Route path={routes.login} component={Login} />
      <Route exact path='/' component={PatientContainer} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
