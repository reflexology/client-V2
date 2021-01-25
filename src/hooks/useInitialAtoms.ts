import { useEffect } from 'react';
import { message } from 'antd';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { patientsAtom } from 'atoms/patientAtoms';
import { transactionsAtom } from 'atoms/transactionAtoms';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';
import TransactionService from 'services/transactionService';

export default function useInitialAtoms() {
  const setPatients = useSetRecoilState(patientsAtom);
  const setTransactions = useSetRecoilState(transactionsAtom);
  const resetPatientsAtom = useResetRecoilState(patientsAtom);
  const resetTransactionsAtom = useResetRecoilState(transactionsAtom);

  useEffect(() => {
    initializeAtoms();

    return resetAtoms();
  }, []);

  const initializeAtoms = () => {
    PatientService.getPatients()
      .then(setPatients)
      .catch(err => CommonService.showErrorMessage(err, 'could not load patients'));

    TransactionService.getTransactions()
      .then(setTransactions)
      .catch(err => CommonService.showErrorMessage(err, 'could not load transactions'));
  };

  const resetAtoms = () => {
    resetPatientsAtom();
    resetTransactionsAtom();
  };
}
