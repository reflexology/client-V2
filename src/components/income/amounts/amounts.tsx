import './amounts.scss';

import { Col, DatePicker, Descriptions, Row } from 'antd';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TransactionService, { Transaction } from 'services/transactionService';

export interface AmountsProps {}

const Amounts: React.SFC<AmountsProps> = () => {
  const { RangePicker } = DatePicker;
  const [details, setDetails] = useState<Transaction[]>([]);

  useEffect(() => {
    TransactionService.getTransactions().then(setDetails);
  }, []);

  const handleChange = (dates: any, dateStrings: [string, string]) => {};
  return (
    <Row justify='center' className='add-transaction-container'>
      <Col span={10}>
        <div className='add-transaction-card'>
          <div className='add-transaction-h2-wrapper'>
            <h2>{Dictionary.amount.header}</h2>
          </div>
          <RangePicker
            ranges={{
              'החודש הזה': [moment().startOf('month'), moment().endOf('month')]
            }}
            onChange={handleChange}
            defaultPickerValue={[moment(), moment()]}
          />
          <Descriptions title='פרטים' layout='vertical'>
            <Descriptions.Item label='תאריך התחלה'>{details[0]}</Descriptions.Item>
            <Descriptions.Item label='תאריך סיום'></Descriptions.Item>
            <Descriptions.Item label='הכנסה'></Descriptions.Item>
            <Descriptions.Item label='הוצאה' span={2}></Descriptions.Item>
            <Descriptions.Item label='נטו'></Descriptions.Item>
          </Descriptions>
        </div>
      </Col>
    </Row>
  );
};

export default withBack(Amounts);
