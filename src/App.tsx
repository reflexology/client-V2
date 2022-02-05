import React, { useState } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import heIL from 'antd/es/locale/he_IL';
import moment from 'moment';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
import history from 'utils/history';
import Routes from './components/router/routes';

import 'moment/locale/he';

moment.locale('he');

message.config({ rtl: true, duration: 3 });

const App: React.FC = () => {
  const [locale] = useState(heIL);

  return (
    <RecoilRoot>
      <ErrorBoundary>
        <ConfigProvider direction='rtl' locale={locale}>
          <HistoryRouter history={history}>
            <Routes />
          </HistoryRouter>
        </ConfigProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
