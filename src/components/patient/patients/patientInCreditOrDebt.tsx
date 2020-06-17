import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import { PatientType } from 'services/patientService';

interface PatientInCreditOrDebtProps {
  onSelect: (type: PatientType) => void;
  patientsInDebtOrCredit: string;
  isLoading: boolean;
}

const PatientInCreditOrDebt: React.FC<PatientInCreditOrDebtProps> = props => {
  const patientsInDebtOrCreditMenu = (
    <Menu>
      {Object.values(PatientType).map(value => (
        <Menu.Item key={value} onClick={() => props.onSelect(value)}>
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