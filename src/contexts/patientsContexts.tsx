import React, { useEffect, useState } from 'react';
import PatientService, { Patient } from 'services/patientService';

type PatientsContextType = {
  patients: Patient[];
  isDataFetchedOnce: boolean;
  setPatients: (patients: Patient[]) => void;
  currentPatient: Patient | undefined;
  setCurrentPatient: (patient: Patient | undefined) => void;
};

export const PatientsContext = React.createContext<PatientsContextType>(undefined!);

export const PatientsProvider: React.FC = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | undefined>(undefined);
  const [isDataFetchedOnce, setIsDataFetchedOnce] = useState(false);

  useEffect(() => {
    PatientService.getPatients()
      .then(setPatients)
      .finally(() => setIsDataFetchedOnce(true));
  }, []);

  return (
    <PatientsContext.Provider value={{ patients, setPatients, isDataFetchedOnce, currentPatient, setCurrentPatient }}>
      {props.children}
    </PatientsContext.Provider>
  );
};

const usePatients = () => React.useContext(PatientsContext);
export default usePatients;
