import './reports.scss';

import { Col, DatePicker, Descriptions, message, Row } from 'antd';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TransactionService, { Report } from 'services/transactionService';
import { DATE_FORMAT } from 'utils/constants';

export interface ReportsProps {}

const Reports: React.FC<ReportsProps> = () => {
  const { RangePicker } = DatePicker;
  const [report, setDetails] = useState<Report>();
  const [startDate, setStartDate] = useState(moment().subtract(1, 'month').add(1, 'day'));
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => getReport(), [startDate, endDate]);

  const getReport = () => {
    if (startDate && endDate)
      TransactionService.getReport(startDate, endDate)
        .then(setDetails)
        .catch(() => message.error(Dictionary.generalErrorAndRefresh));
  };

  const handleChange = (dates: any, dateStrings: [string, string]) => {
    setStartDate(dates?.[0]);
    setEndDate(dates?.[1]);
  };

  return (
    <Row justify='center' className='report-container'>
      <Col span={10}>
        <div className='report-card'>
          <div className='report-h2-wrapper'>
            <h2>{Dictionary.report.header}</h2>
          </div>
          <RangePicker
            ranges={{
              'החודש הזה': [moment().startOf('month'), moment().endOf('month')]
            }}
            onChange={handleChange}
            value={[startDate, endDate]}
            defaultPickerValue={[moment(), moment()]}
            allowClear={false}
          />
          <Descriptions title={Dictionary.report.title} layout='vertical'>
            <Descriptions.Item label={Dictionary.report.income} className='income'>
              {report?.income}
            </Descriptions.Item>
            <Descriptions.Item label={Dictionary.report.expenditure}>{report?.expenditure}</Descriptions.Item>
            <Descriptions.Item label={Dictionary.report.netAmount}>{report?.netAmount}</Descriptions.Item>
            <Descriptions.Item label={Dictionary.report.startDate}>{startDate?.format(DATE_FORMAT)}</Descriptions.Item>
            <Descriptions.Item label={Dictionary.report.endDate}>{endDate?.format(DATE_FORMAT)}</Descriptions.Item>
          </Descriptions>
        </div>
      </Col>
    </Row>
  );
};

export default withBack(Reports);
