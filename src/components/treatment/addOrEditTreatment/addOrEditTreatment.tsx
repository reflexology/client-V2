import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message, Spin } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import moment from 'moment';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import FileService from 'services/fileService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TreatmentForm from '../treatmentForm/treatmentForm';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { patientsAtom } from 'atoms/patientAtoms';
import PatientService from 'services/patientService';
import { currentTreatmentAtom } from 'atoms/treatmentAtoms';
import { useCallback } from 'react';

interface AddOrEditTreatmentProps extends RouteComponentProps<{ patientId: string; treatmentId?: string }> {}

const AddOrEditTreatment: React.FC<AddOrEditTreatmentProps> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPartialData, setIsSavingPartialData] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const setPatients = useSetRecoilState(patientsAtom);
  const [currentTreatment, setCurrentTreatment] = useRecoilState(currentTreatmentAtom);

  const patientId = props.match.params.patientId;
  const treatmentId = props.match.params.treatmentId;

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
            treatmentDate: moment()
            // balance: balance
          });
        })
        .finally(() => setIsFetching(false));

    return () => {
      setCurrentTreatment(undefined);
    };
  }, []);

  const handleSubmit = useCallback(
    async (values: Treatment, newDiagnoses: string[], files: RcFile[]) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setError('');

      try {
        if (newDiagnoses?.length > 0)
          DiagnosisService.addDiagnoses(newDiagnoses).catch(() => message.error(Dictionary.cantSaveDiagnosesError));

        if (files?.length > 0) {
          setIsUploading(true);
          const fileResponse = await FileService.uploadMultiple(files);
          values.files = fileResponse.map(file => ({
            key: file.key,
            name: file.originalname,
            location: file.location
          }));
          setIsUploading(false);
        }
        await TreatmentService.addOrEditTreatment(patientId, values);

        props.history.push(routes.treatments.format(patientId));
        PatientService.getPatients().then(setPatients);
      } catch (error) {
        setError(CommonService.getErrorMessage(error));
        setIsSubmitting(false);
      }
    },
    [isSubmitting, patientId, props.history]
  );

  const submitPartialData = useCallback(
    (values: Treatment) => {
      setIsSavingPartialData(true);
      TreatmentService.addOrEditTreatment(patientId, { ...values, _id: currentTreatment?._id! }).then(treatment => {
        if (!treatmentId) props.history.push(routes.editTreatment.format(patientId, treatment._id));
        setCurrentTreatment(treatment);
        setIsSavingPartialData(false);
      });
    },
    [patientId, currentTreatment, treatmentId, props.history]
  );

  const treatmentDate = currentTreatment?.treatmentDate;
  const reminderDate = currentTreatment?.reminderDate;

  const initialValues = useMemo(
    () => ({
      ...currentTreatment,
      treatmentDate: !treatmentDate || moment.isMoment(treatmentDate) ? treatmentDate : moment(treatmentDate),
      reminderDate: !reminderDate || moment.isMoment(reminderDate) ? reminderDate : moment(reminderDate)
    }),
    [currentTreatment]
  );

  return (
    <Spin spinning={isFetching}>
      <TreatmentForm
        isUploading={isUploading}
        initialValues={initialValues}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        isSavingPartialData={isSavingPartialData}
        submitPartialData={submitPartialData}
        error={error}
      />
    </Spin>
  );
};

export default AddOrEditTreatment;
