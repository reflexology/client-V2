import AddTransaction from 'components/income/addTransaction/addTransaction';
import Amounts from 'components/income/amounts/amounts';
import TransactionContainer from 'components/income/transactions/transactionContainer';
import AddPatient from 'components/patient/addPatient/addPatient';
import EditPatient from 'components/patient/editPatient/editPatient';
import PatientContainer from 'components/patient/patients/patientContainer';
import AddTreatment from 'components/treatment/addTreatment/addTreatment';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../login/login';
import NotFound from '../notFound/notFound';
import ProtectedRoute from './protectedRoute';

export enum routes {
  login = '/login',
  addPatient = '/add-patient',
  editPatient = '/edit-patient/{0}',
  patients = '/patients',
  transactions = '/transactions',
  addTreatment = '/add-treatment/{0}',
  addTransaction = '/add-transaction',
  amounts = '/amounts'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={routes.addPatient} component={AddPatient} />
      <ProtectedRoute exact path={routes.editPatient.format(':patientId')} component={EditPatient} />
      <ProtectedRoute exact path={routes.patients} component={PatientContainer} />
      <ProtectedRoute exact path={routes.transactions} component={TransactionContainer} />
      <ProtectedRoute exact path={routes.addTreatment.format(':patientId')} component={AddTreatment} />
      <ProtectedRoute exact path={routes.addTransaction} component={AddTransaction} />
      <ProtectedRoute exact path={routes.amounts} component={Amounts} />
      <Route path={routes.login} component={Login} />
      <Route exact path='/' component={PatientContainer} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
