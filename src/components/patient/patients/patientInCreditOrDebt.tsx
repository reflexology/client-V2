import React from 'react';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import Dictionary from 'dictionary/dictionary';
import { PatientType } from 'services/patientService';

interface PatientInCreditOrDebtProps {
  onSelect: (type: PatientType) => void;
  patientsInDebtOrCredit: PatientType;
  isLoading: boolean;
}

const PatientInCreditOrDebt: React.FC<PatientInCreditOrDebtProps> = props => {
  const patientsInDebtOrCreditMenu = (
    <Menu>
      {Object.values(PatientType).map(value => (
        <Menu.Item key={value} onClick={() => (props.patientsInDebtOrCredit !== value ? props.onSelect(value) : null)}>
          {Dictionary.patientContainer[value]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={patientsInDebtOrCreditMenu}>
      <Button>
        {props.isLoading && <LoadingOutlined />}
        {Dictionary.patientContainer[props.patientsInDebtOrCredit as keyof typeof Dictionary.patientContainer]}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default PatientInCreditOrDebt;
