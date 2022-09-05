import React from 'react';
import { Route, Routes as RoutesContainer } from 'react-router-dom';

import AddTransaction from 'components/income/addTransaction/addTransaction';
import EditTransaction from 'components/income/editTransaction/editTransaction';
import Reports from 'components/income/reports/reports';
import TransactionContainer from 'components/income/transactions/transactionContainer';
import AddPatient from 'components/patient/addPatient/addPatient';
import EditPatient from 'components/patient/editPatient/editPatient';
import PatientContainer from 'components/patient/patients/patientContainer';
import Sidebar from 'components/sidebar/sidebar';
import AddOrEditTreatment from 'components/treatment/addOrEditTreatment/addOrEditTreatment';
import TreatmentData from 'components/treatment/treatment/treatment';
import TreatmentsContainer from 'components/treatment/treatments/treatmentsContainer';
import Login from '../login/login';
import NotFound from '../notFound/notFound';
import RequireAuth from './requireAuth';

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
    <RoutesContainer>
      <Route path='/' element={<Sidebar />}>
        <Route path={routes.login} element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path={routes.addPatient} element={<AddPatient />} />
          <Route path={routes.editPatient.format(':patientId')} element={<EditPatient />} />
          <Route path={routes.patients} element={<PatientContainer />} />
          <Route path={routes.transactions} element={<TransactionContainer />} />
          <Route path={routes.addTreatment.format(':patientId')} element={<AddOrEditTreatment />} />
          <Route path={routes.editTreatment.format(':patientId', ':treatmentId')} element={<AddOrEditTreatment />} />
          <Route path={routes.treatments.format(':patientId')} element={<TreatmentsContainer />} />
          <Route path={routes.treatment.format(':treatmentId')} element={<TreatmentData />} />
          <Route path={routes.addTransaction} element={<AddTransaction />} />
          <Route path={routes.editTransaction.format(':transactionId')} element={<EditTransaction />} />
          <Route path={routes.reports} element={<Reports />} />
          <Route path='' element={<PatientContainer />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </RoutesContainer>
  );
};

export default Routes;
