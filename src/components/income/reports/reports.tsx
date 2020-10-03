import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Descriptions, message, Row, Space } from 'antd';
import moment from 'moment';

import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import TransactionService, { Report } from 'services/transactionService';
import { DATE_FORMAT, MONTH_FORMAT } from 'utils/constants';

import './reports.scss';

export interface ReportsProps {}

const Reports: React.FC<ReportsProps> = () => {
  const [report, setReport] = useState<Report>();
  const [month, setMonth] = useState<moment.Moment>(moment());

  useEffect(() => {
    getReport();
  }, [month]);

  const getReport = () =>
    TransactionService.getReport(month.clone().startOf('month'), month.clone().endOf('month'))
      .then(setReport)
      .catch(() => message.error(Dictionary.generalErrorAndRefresh));

  return (
    <Row justify='center' className='report-container'>
      <Col xl={12} md={16} sm={20}>
        <div className='report-card'>
          <Space direction='vertical'>
            <h2>{Dictionary.report.header}</h2>
            <DatePicker
              picker='month'
              onChange={date => setMonth(date!)}
              value={month}
              allowClear={false}
              format={MONTH_FORMAT}
            />
            <Descriptions /*title={Dictionary.report.title}*/ layout='vertical'>
              <Descriptions.Item label={Dictionary.report.income}>
                <div className='income'>{report?.income}</div>
              </Descriptions.Item>
              <Descriptions.Item label={Dictionary.report.expenditure}>
                <div className={`${report?.expenditure === 0 ? '' : ' expenditure'}`}>{report?.expenditure}</div>
              </Descriptions.Item>
              <Descriptions.Item label={Dictionary.report.netAmount}>
                <div>{report?.netAmount}</div>
              </Descriptions.Item>
              <Descriptions.Item label={Dictionary.report.startDate}>
                {month.clone().startOf('month').format(DATE_FORMAT)}
              </Descriptions.Item>
              <Descriptions.Item label={Dictionary.report.endDate}>
                {month.clone().endOf('month').format(DATE_FORMAT)}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default withBack(Reports);
