import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Image, Space } from 'antd';
import moment from 'moment';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import useCurrentPatient from 'hooks/useCurrentPatient';
import CommonService from 'services/commonService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT, VALID_DATE_FORMATS } from 'utils/constants';
import history from 'utils/history';

import './treatment.scss';

interface TreatmentProps extends RouteComponentProps<{ treatmentId: string }, never, Treatment> {}

const TreatmentData: React.FC<TreatmentProps> = props => {
  const [treatment, setTreatment] = useState<Treatment>(props.location.state);

  const currentPatient = useCurrentPatient({ treatmentId: props.match.params.treatmentId });

  useEffect(() => {
    if (!treatment) TreatmentService.getTreatmentById(props.match.params.treatmentId).then(setTreatment);
  }, []);

  const renderValue = (key: string, value: string[] | string) => {
    const date = moment(value, VALID_DATE_FORMATS, true);
    if (date.isValid()) return date.format(DATE_FORMAT);
    if (Array.isArray(value)) return value.join(', ');
    if (key === 'treatmentType')
      return Dictionary.treatmentTypes[value.toLowerCase() as keyof typeof Dictionary.treatmentTypes];
    else return value;
  };

  return treatment ? (
    <>
      <Descriptions
        className='treatment-description'
        layout='vertical'
        bordered
        column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
        title={<span className='ml-6'>טיפול מספר: {treatment.treatmentNumber}</span>}
        extra={
          <Space>
            <Button
              disabled={!currentPatient}
              onClick={() =>
                history.push(routes.editTreatment.format(currentPatient?._id!, props.match?.params.treatmentId))
              }
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
              span={typeof value === 'string' && value.length > 50 ? 3 : undefined}
              key={key}
              label={[Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]]}
            >
              {renderValue(key, value)}
            </Descriptions.Item>
          ))}
      </Descriptions>
      {treatment.bloodTests.length > 0 && (
        <Card className='blood-test-container' title='בדיקות דם'>
          {treatment.bloodTests.map(bloodTest => (
            <Card.Grid key={bloodTest.name} className={`blood-test-item${bloodTest.isImportant ? ' important' : ''}`}>
              {bloodTest.name}: {bloodTest.value}
            </Card.Grid>
          ))}
        </Card>
      )}
      {treatment.files?.map(file => (
        <Image key={file.key} src={`http://localhost:3030/api/file/${file.key}`} alt='something'></Image>
      ))}
    </>
  ) : null;
};

export default TreatmentData;
