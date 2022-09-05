import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import moment from 'moment';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { patientsAtom } from 'atoms/patientAtoms';
import { currentTreatmentAtom } from 'atoms/treatmentAtoms';
import BackButton from 'components/common/backButton/backButton';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import useCurrentPatient from 'hooks/useCurrentPatient';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import PatientService from 'services/patientService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TreatmentForm from '../treatmentForm/treatmentForm';

interface AddOrEditTreatmentProps {}

const AddOrEditTreatment: React.FC<AddOrEditTreatmentProps> = props => {
  const params = useParams<{ patientId: string; treatmentId?: string }>();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPartialData, setIsSavingPartialData] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const setPatients = useSetRecoilState(patientsAtom);
  const [currentTreatment, setCurrentTreatment] = useRecoilState(currentTreatmentAtom);

  const patientId = params.patientId as string;
  const treatmentId = params.treatmentId as string;

  useCurrentPatient({ patientId });

  useEffect(() => {
    if (treatmentId)
      TreatmentService.getTreatmentById(treatmentId)
        .then(treatment => setCurrentTreatment(treatment))
        .finally(() => setIsFetching(false));
    else
      TreatmentService.getLastTreatment(patientId)
        .then(lastTreatment => {
          setCurrentTreatment({
            treatmentNumber: (lastTreatment?.treatmentNumber || 0) + 1,
            referredBy: lastTreatment?.referredBy,
            treatmentPrice: lastTreatment?.treatmentPrice,
            treatmentDate: moment(),
            treatmentType: lastTreatment?.treatmentType
          });
        })
        .finally(() => setIsFetching(false));

    return () => {
      setCurrentTreatment(undefined);
    };
  }, []);

  const handleSubmit = useCallback(
    async (values: Treatment, newDiagnoses: string[]) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setError('');

      try {
        if (newDiagnoses?.length > 0)
          DiagnosisService.addDiagnoses(newDiagnoses).catch(() => message.error(Dictionary.cantSaveDiagnosesError));

        await TreatmentService.addOrEditTreatment(patientId, values);

        navigate(routes.treatments.format(patientId));
        PatientService.getPatients().then(setPatients);
      } catch (error) {
        setError(CommonService.getErrorMessage(error as any));
        setIsSubmitting(false);
      }
    },
    [isSubmitting, patientId, navigate]
  );

  const submitPartialData = useCallback(
    (values: Treatment) => {
      setIsSavingPartialData(true);
      TreatmentService.addOrEditTreatment(patientId, { ...values, _id: currentTreatment?._id! }).then(treatment => {
        if (!treatmentId) navigate(routes.editTreatment.format(patientId, treatment._id));
        setCurrentTreatment(treatment);
        setIsSavingPartialData(false);
      });
    },
    [patientId, currentTreatment, treatmentId, navigate]
  );

  const treatmentDate = currentTreatment?.treatmentDate;
  const reminderDate = currentTreatment?.reminderDate;

  const initialValues = useMemo(
    () => ({
      ...currentTreatment,
      treatmentDate: CommonService.getMomentDateFromString(treatmentDate),
      reminderDate: CommonService.getMomentDateFromString(reminderDate)
    }),
    [currentTreatment]
  );

  return (
    <>
      <BackButton />
      <Spin spinning={isFetching}>
        <TreatmentForm
          initialValues={initialValues}
          isLoading={isSubmitting}
          onSubmit={handleSubmit}
          isSavingPartialData={isSavingPartialData}
          submitPartialData={submitPartialData}
          error={error}
        />
      </Spin>
    </>
  );
};

export default AddOrEditTreatment;
