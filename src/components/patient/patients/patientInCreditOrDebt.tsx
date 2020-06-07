import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import { PatientType } from 'services/patientService';

interface PatientInCreditOrDebtProps {
  inDebtOrCredit: any;
  patientsInDebtOrCredit: string;
}

const PatientInCreditOrDebt: React.FC<PatientInCreditOrDebtProps> = props => {
  const patientsInDebtOrCreditMenu = (
    <Menu>
      <Menu.Item key={PatientType.InCredit} onClick={() => props.inDebtOrCredit(true)}>
        {Dictionary.patientContainer.showInCredit}
      </Menu.Item>
      <Menu.Item key={PatientType.InDebt} onClick={() => props.inDebtOrCredit(false, true)}>
        {Dictionary.patientContainer.showInDebt}
      </Menu.Item>
      <Menu.Item key={PatientType.AllPatients} onClick={props.inDebtOrCredit}>
        {Dictionary.patientContainer.showAllPatients}
      </Menu.Item>
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
