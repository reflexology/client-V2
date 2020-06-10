import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import { PatientType } from 'services/patientService';

interface PatientInCreditOrDebtProps {
  inDebtOrCredit: (type: PatientType) => void;
  patientsInDebtOrCredit: string;
}

const PatientInCreditOrDebt: React.FC<PatientInCreditOrDebtProps> = props => {
  const patientsInDebtOrCreditMenu = (
    <Menu>
      {Object.values(PatientType).map(value => (
        <Menu.Item key={value} onClick={() => props.inDebtOrCredit(value)}>
          {Dictionary.patientContainer[value]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={patientsInDebtOrCreditMenu}>
      <Button>
        {Dictionary.patientContainer[props.patientsInDebtOrCredit as keyof typeof Dictionary.patientContainer]}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default PatientInCreditOrDebt;
