import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddTransaction from 'components/income/addTransaction/addTransaction';
import EditTransaction from 'components/income/editTransaction/editTransaction';
import Reports from 'components/income/reports/reports';
import TransactionContainer from 'components/income/transactions/transactionContainer';
import AddPatient from 'components/patient/addPatient/addPatient';
import EditPatient from 'components/patient/editPatient/editPatient';
import PatientContainer from 'components/patient/patients/patientContainer';
import AddOrEditTreatment from 'components/treatment/addOrEditTreatment/addOrEditTreatment';
import TreatmentData from 'components/treatment/treatment/treatment';
import TreatmentsContainer from 'components/treatment/treatments/treatmentsContainer';
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
  editTreatment = '/edit-treatment/{0}/{1}',
  treatments = '/treatments/{0}',
  treatment = '/treatment/{0}',
  addTransaction = '/add-transaction',
  editTransaction = '/edit-transaction/{0}',
  reports = '/reports'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={routes.addPatient} component={AddPatient} />
      <ProtectedRoute exact path={routes.editPatient.format(':patientId')} component={EditPatient} />
      <ProtectedRoute exact path={routes.patients} component={PatientContainer} />
      <ProtectedRoute exact path={routes.transactions} component={TransactionContainer} />
      <ProtectedRoute exact path={routes.addTreatment.format(':patientId')} component={AddOrEditTreatment} />
      <ProtectedRoute
        exact
        path={routes.editTreatment.format(':patientId', ':treatmentId')}
        component={AddOrEditTreatment}
      />
      <ProtectedRoute exact path={routes.treatments.format(':patientId')} component={TreatmentsContainer} />
      <ProtectedRoute exact path={routes.treatment.format(':treatmentId')} component={TreatmentData} />
      <ProtectedRoute exact path={routes.addTransaction} component={AddTransaction} />
      <ProtectedRoute exact path={routes.editTransaction.format(':transactionId')} component={EditTransaction} />
      <ProtectedRoute exact path={routes.reports} component={Reports} />
      <Route path={routes.login} component={Login} />
      <ProtectedRoute exact path='/' component={PatientContainer} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
