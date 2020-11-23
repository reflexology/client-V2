import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Space } from 'antd';
import moment from 'moment';

import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT, VALID_DATE_FORMATS } from 'utils/constants';
import CommonService from 'services/commonService';
import history from 'utils/history';
import { routes } from 'components/router/routes';
import CurrentPatient from 'components/common/currentPatient';

interface TreatmentProps extends RouteComponentProps<{ treatmentId: string }, never, Treatment> {}

const TreatmentData: React.FC<TreatmentProps> = props => {
  const [treatment, setTreatment] = useState<Treatment>(props.location.state);

  useEffect(() => {
    if (!treatment) TreatmentService.getTreatmentById(props.match?.params.treatmentId!).then(setTreatment);
  }, []);

  const renderValue = (value: any) => {
    const date = moment(value, VALID_DATE_FORMATS, true);
    if (date.isValid()) return date.format(DATE_FORMAT);
    if (Array.isArray(value)) return value.join(', ');
    else return value;
  };

  return treatment ? (
    <>
      <Descriptions
        title={
          <>
            <span className='ml-6'>טיפול מספר: {treatment.treatmentNumber}</span>
            <CurrentPatient />
          </>
        }
        extra={
          <Space>
            <Button
              onClick={() => history.push(routes.editTreatment.format(props.match?.params.treatmentId), treatment)}
              type='primary'
            >
              ערוך
            </Button>
            <Button icon={<ArrowRightOutlined />} onClick={() => history.goBack()} type='default'>
              {Dictionary.back}
            </Button>
          </Space>
        }
      >
        {Object.entries(treatment)
          .filter(
            ([key, value]) =>
              CommonService.isNotEmpty(value) &&
              !!Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]
          )
          ?.map(([key, value]) => (
            <Descriptions.Item
              key={key}
              label={[Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]]}
            >
              {renderValue(value)}
            </Descriptions.Item>
          ))}
        <Descriptions.Item label={'בדיקות דם'}>
          {treatment.bloodTests?.map(bloodTest => (
            <div key={bloodTest.name} style={{ color: bloodTest.isImportant ? 'red' : 'black' }}>
              {bloodTest.name}: {bloodTest.value}
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      {treatment.files?.map(file => (
        <Image key={file.key} src={`http://localhost:3030/api/file/${file.key}`} alt='something'></Image>
      ))}
    </>
  ) : null;
};

export default TreatmentData;
