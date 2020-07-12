import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message, Spin } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import moment from 'moment';

import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import FileService from 'services/fileService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TreatmentForm from '../treatmentForm/treatmentForm';

interface AddTreatmentProps extends RouteComponentProps<{ patientId: string }> {}

const AddTreatment: React.FC<AddTreatmentProps> = props => {
  const [initialValues, setInitialValues] = useState<Partial<Treatment>>();
  const [balance, setBalance] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const { fetchPatients } = usePatients();
  const patientId = props.match.params.patientId;

  useEffect(() => {
    TreatmentService.getLastTreatment(patientId)
      .then(({ lastTreatment, balance }) => {
        setInitialValues({
          treatmentNumber: (lastTreatment?.treatmentNumber || 0) + 1,
          referredBy: lastTreatment?.referredBy,
          treatmentPrice: lastTreatment?.treatmentPrice,
          treatmentDate: moment()
        });
        setBalance(balance);
      })
      .finally(() => setIsFetching(false));
  }, []);

  const handleSubmit = async (values: Treatment, newDiagnoses: string[], files: RcFile[]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      if (newDiagnoses?.length > 0)
        DiagnosisService.addDiagnoses(newDiagnoses).catch(() => message.error(Dictionary.cantSaveDiagnosesError));

      if (files?.length > 0) {
        setIsUploading(true);
        const fileResponse = await FileService.uploadMultiple(files);
        values.files = fileResponse.map(file => ({ key: file.key, name: file.originalname, location: file.location }));
        setIsUploading(false);
      }
      await TreatmentService.addTreatment(patientId, values);

      props.history.push(routes.treatments.format(patientId));
      fetchPatients();
    } catch (error) {
      setError(CommonService.getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <Spin spinning={isFetching}>
      <TreatmentForm
        isUploading={isUploading}
        initialValues={initialValues}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        error={error}
        balance={balance}
      />
    </Spin>
  );
};

export default AddTreatment;
