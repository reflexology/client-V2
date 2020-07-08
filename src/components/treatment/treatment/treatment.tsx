import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Descriptions } from 'antd';

import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';

interface TreatmentProps extends RouteComponentProps<{ treatmentId: string }, any, Treatment> {}

const TreatmentData: React.FC<TreatmentProps> = props => {
  const [treatment, setTreatment] = useState<Treatment>(props.location.state);

  useEffect(() => {
    if (!treatment) TreatmentService.getTreatmentById(props.match?.params.treatmentId!).then(setTreatment);
  }, []);

  return treatment ? (
    <Descriptions title='טיפול'>
      {Object.entries(treatment).map(([key, value]) =>
        Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm] ? (
          <Descriptions.Item key={key} label={[Dictionary.treatmentForm[key as keyof typeof Dictionary.treatmentForm]]}>
            {value}
          </Descriptions.Item>
        ) : null
      )}
    </Descriptions>
  ) : null;
};

export default TreatmentData;
