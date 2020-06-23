import { message, Spin } from 'antd';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import TreatmentService, { Treatment } from 'services/treatmentService';

import TreatmentForm from '../treatmentForm/treatmentForm';

interface AddTreatmentProps extends RouteComponentProps<{ patientId: string }> {}

const AddTreatment: React.FC<AddTreatmentProps> = props => {
  const [initialValues, setInitialValues] = useState<Partial<Treatment>>();
  const [balance, setBalance] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    TreatmentService.getLastTreatment(props.match.params.patientId)
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

  const handleSubmit = (values: any, newDiagnoses: string[]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    TreatmentService.addTreatment(props.match.params.patientId, values)
      .then(() => props.history.push(routes.patients))
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });

    if (newDiagnoses?.length > 0)
      DiagnosisService.addDiagnoses(newDiagnoses).catch(() => message.error(Dictionary.cantSaveDiagnosesError));
  };

  return (
    <Spin spinning={isFetching}>
      <TreatmentForm
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
