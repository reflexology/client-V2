import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message, Spin } from 'antd';
import { RcFile } from 'antd/lib/upload';
import moment from 'moment';
import { useRecoilState } from 'recoil';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import FileService from 'services/fileService';
import TreatmentService, { Treatment, TreatmentFile } from 'services/treatmentService';
import TreatmentForm from '../treatmentForm/treatmentForm';
import { currentPatientAtom } from 'atoms/patientAtoms';

interface EditTreatmentProps extends RouteComponentProps<{ treatmentId: string }, never, Treatment> {}

const EditTreatment: React.FC<EditTreatmentProps> = props => {
  const [currentPatient, setCurrentPatient] = useRecoilState(currentPatientAtom);

  const [treatment, setTreatment] = useState<Treatment>(props.location.state);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const treatmentId = props.match.params.treatmentId;

  useEffect(() => {
    TreatmentService.getTreatmentById(treatmentId)
      .then(treatment => setTreatment(treatment))
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    // if (!currentPatient) setCurrentPatient(treatmentId);//TODO
  }, []);

  const handleSubmit = async (values: Treatment, newDiagnoses: string[], files: RcFile[]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    if (newDiagnoses?.length > 0)
      DiagnosisService.addDiagnoses(newDiagnoses).catch(() => message.error(Dictionary.cantSaveDiagnosesError));

    try {
      const newFiles = files.filter(file => file instanceof File);
      if (newFiles.length > 0) {
        setIsUploading(true);
        const fileResponse = await FileService.uploadMultiple(newFiles);
        setIsUploading(false);
        const files = fileResponse.map<TreatmentFile>(file => ({
          key: file.key,
          name: file.originalname,
          location: file.location
        }));

        values.files.push(...files);
      }
      await TreatmentService.editTreatment(props.match.params.treatmentId, values);
      props.history.push(routes.treatments.format(currentPatient!._id));
    } catch (error) {
      setError(CommonService.getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <Spin spinning={isFetching}>
      <TreatmentForm
        initialValues={{ ...treatment, treatmentDate: moment(treatment.treatmentDate) }}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        error={error}
        isUploading={isUploading}
      />
    </Spin>
  );
};

export default EditTreatment;
