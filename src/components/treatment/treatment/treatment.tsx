import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Descriptions, Image } from 'antd';
import moment from 'moment';
import { useRecoilState } from 'recoil';

import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT, VALID_DATE_FORMATS } from 'utils/constants';
import CommonService from 'services/commonService';
import history from 'utils/history';
import { routes } from 'components/router/routes';
import CurrentPatient from 'components/common/currentPatient';
import { currentTreatmentAtom } from 'atoms/treatmentAtoms';
import useSetCurrentPatient from 'hooks/useSetCurrentPatient';

interface TreatmentProps extends RouteComponentProps<{ treatmentId: string }, never, Treatment> {}

const TreatmentData: React.FC<TreatmentProps> = props => {
  const [currentTreatment, setCurrentTreatment] = useRecoilState<Treatment | undefined>(currentTreatmentAtom as any);
  const treatmentId = props.match.params.treatmentId;

  useSetCurrentPatient(treatmentId);

  useEffect(() => {
    const treatment = props.location.state;

    if (!treatment) TreatmentService.getTreatmentById(treatmentId).then(setCurrentTreatment);
    else setCurrentTreatment(treatment);

    return () => {
      setCurrentTreatment(undefined);
    };
  }, []);

  const renderValue = (value: any) => {
    const date = moment(value, VALID_DATE_FORMATS, true);
    if (date.isValid()) return date.format(DATE_FORMAT);
    if (Array.isArray(value)) return value.join(', ');
    else return value;
  };

  return currentTreatment ? (
    <>
      <Descriptions
        title={
          <>
            <span className='ml-6'>טיפול מספר: {currentTreatment.treatmentNumber}</span>
            <CurrentPatient />
          </>
        }
        extra={
          <Button
            onClick={() => history.push(routes.editTreatment.format(props.match?.params.treatmentId), currentTreatment)}
            type='primary'
          >
            ערוך
          </Button>
        }
      >
        {Object.entries(currentTreatment)
          .filter(
            ([key, value]) =>
              CommonService.isNotEmpty(value) &&
              !!Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]
          )
          .map(([key, value]) => (
            <Descriptions.Item
              key={key}
              label={[Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]]}
            >
              {renderValue(value)}
            </Descriptions.Item>
          ))}
        {currentTreatment.bloodTests?.length > 1 && (
          <Descriptions.Item label={'בדיקות דם'}>
            {currentTreatment.bloodTests.map(bloodTest => (
              <div key={bloodTest.name} style={{ color: bloodTest.isImportant ? 'red' : 'black' }}>
                {bloodTest.name}: {bloodTest.value}
              </div>
            ))}
          </Descriptions.Item>
        )}
      </Descriptions>
      {currentTreatment.files?.map(file => (
        <Image key={file.key} src={`http://localhost:3030/api/file/${file.key}`} alt='something'></Image>
      ))}
    </>
  ) : null;
};

export default TreatmentData;
