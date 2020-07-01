import React, { useCallback, useEffect, useState } from 'react';
import PatientService, { Patient } from 'services/patientService';

type PatientsContextType = {
  patients: Patient[];
  isDataFetchedOnce: boolean;
  setPatients: (patients: Patient[]) => void;
  currentPatient: Patient | undefined;
  setCurrentPatient: (patient: Patient | undefined) => void;
  addPatient: (patient: Patient) => void;
  setPatient: (patient: Patient) => void;
  setCurrentPatientById: (patientId: string) => void;
};

export const PatientsContext = React.createContext<PatientsContextType>(undefined!);

export const PatientsProvider: React.FC = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | undefined>(undefined);
  const [isDataFetchedOnce, setIsDataFetchedOnce] = useState(false);

  const addPatient = useCallback((patient: Patient) => setPatients([patient, ...patients]), [patients]);

  const setPatient = useCallback(
    (editedPatient: Patient) => {
      const clonedPatients = [...patients];
      const index = clonedPatients.findIndex(patient => patient._id === editedPatient._id);
      clonedPatients[index] = editedPatient;
      setPatients(clonedPatients);
    },
    [patients]
  );

  const setCurrentPatientById = useCallback(
    (patientId: string) => setCurrentPatient(patients.find(patient => patient._id === patientId)),
    [patients]
  );

  useEffect(() => {
    PatientService.getPatients()
      .then(setPatients)
      .finally(() => setIsDataFetchedOnce(true));
  }, []);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        isDataFetchedOnce,
        currentPatient,
        setCurrentPatient,
        addPatient,
        setPatient,
        setCurrentPatientById
      }}
    >
      {props.children}
    </PatientsContext.Provider>
  );
};

const usePatients = () => React.useContext(PatientsContext);
export default usePatients;
