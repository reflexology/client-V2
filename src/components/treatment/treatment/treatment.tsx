import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Space } from 'antd';
import moment from 'moment';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import useCurrentPatient from 'hooks/useCurrentPatient';
import CommonService from 'services/commonService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT, VALID_DATE_FORMATS } from 'utils/constants';

import './treatment.scss';

const TreatmentData: React.FC = () => {
  const params = useParams<{ treatmentId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [treatment, setTreatment] = useState<Treatment>(location.state as Treatment);

  const currentPatient = useCurrentPatient({ treatmentId: params.treatmentId });

  useEffect(() => {
    if (!treatment) TreatmentService.getTreatmentById(params.treatmentId!).then(setTreatment);
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
              onClick={() => navigate(routes.editTreatment.format(currentPatient?._id!, params.treatmentId!))}
              type='primary'
            >
              ערוך
            </Button>
            <Button icon={<ArrowRightOutlined />} onClick={() => navigate(-1)} type='default'>
              {Dictionary.back}
            </Button>
          </Space>
        }
      >
        {Object.entries(treatment)
          .filter(
            ([key, value]) =>
              (CommonService.isNotEmpty(value) || value === 0) &&
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

      {treatment.files?.map(file => (
        <Image key={file.key} src={`http://localhost:3030/api/file/${file.key}`} alt='something'></Image>
      ))}
    </>
  ) : null;
};

export default TreatmentData;
