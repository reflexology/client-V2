import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message, Spin } from 'antd';
import moment from 'moment';

import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TreatmentForm from '../treatmentForm/treatmentForm';

interface EditTreatmentProps extends RouteComponentProps<{ treatmentId: string }, any, Treatment> {}

const EditTreatment: React.FC<EditTreatmentProps> = props => {
  const { currentPatient } = usePatients();

  const [treatment, setTreatment] = useState<Treatment>(props.location.state);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    TreatmentService.getTreatmentById(props.match.params.treatmentId)
      .then(treatment => setTreatment(treatment))
      .finally(() => setIsFetching(false));
  }, []);

  const handleSubmit = (values: any, newDiagnoses: string[]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    TreatmentService.editTreatment(props.match.params.treatmentId, values)
      .then(() => props.history.push(routes.treatments.format(currentPatient!._id)))
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
        initialValues={{ ...treatment, treatmentDate: moment(treatment.treatmentDate) }}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        error={error}
      />
    </Spin>
  );
};

export default EditTreatment;
