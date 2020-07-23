import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Descriptions } from 'antd';
import moment from 'moment';

import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT, VALID_DATE_FORMATS } from 'utils/constants';
import CommonService from 'services/commonService';

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
    <Descriptions title='טיפול'>
      {Object.entries(treatment)
        .filter(
          ([key, value]) =>
            CommonService.isNotEmpty(value) && !!Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]
        )
        .map(([key, value]) => (
          <Descriptions.Item key={key} label={[Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]]}>
            {renderValue(value)}
          </Descriptions.Item>
        ))}
    </Descriptions>
  ) : null;
};

export default TreatmentData;
