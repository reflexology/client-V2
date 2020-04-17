import './reports.scss';

import { Col, DatePicker, Descriptions, message, Row } from 'antd';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TransactionService, { Report } from 'services/transactionService';

export interface ReportsProps {}

const Reports: React.SFC<ReportsProps> = () => {
  const { RangePicker } = DatePicker;
  const [report, setDetails] = useState<Report>();
  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().toDate());

  useEffect(() => {
    TransactionService.getReport(startDate, endDate)
      .then(setDetails)
      .catch(() => {
        message.error(Dictionary.generalErrorAndRefresh);
      });
  }, []);

  const handleChange = (dates: any, dateStrings: [string, string]) => {
    setStartDate(dates[0]?._d);
    setEndDate(dates[1]?._d);
    TransactionService.getReport(dates[0]?._d, dates[1]?._d)
      .then(setDetails)
      .catch(() => {
        message.error(Dictionary.generalErrorAndRefresh);
      });
  };

  return (
    <Row justify='center' className='add-transaction-container'>
      <Col span={10}>
        <div className='add-transaction-card'>
          <div className='add-transaction-h2-wrapper'>
            <h2>{Dictionary.report.header}</h2>
          </div>
          <RangePicker
            ranges={{
              'החודש הזה': [moment().startOf('month'), moment().endOf('month')]
            }}
            onChange={handleChange}
            defaultPickerValue={[moment(), moment()]}
          />
          <Descriptions title='פרטים' layout='vertical'>
            <Descriptions.Item label='תאריך התחלה'>{startDate?.toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label='תאריך סיום'>{endDate?.toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label='הכנסה'>{report?.income}</Descriptions.Item>
            <Descriptions.Item label='הוצאה'>{report?.expenditure}</Descriptions.Item>
            <Descriptions.Item label='נטו'>{report?.netAmount}</Descriptions.Item>
          </Descriptions>
        </div>
      </Col>
    </Row>
  );
};

export default withBack(Reports);
