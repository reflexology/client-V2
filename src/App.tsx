import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import heIL from 'antd/es/locale/he_IL';
import moment from 'moment';

import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
import Sidebar from 'components/sidebar/sidebar';
import Routes from './components/router/routes';
import history from './utils/history';

import 'moment/locale/he';

moment.locale('he');

message.config({ rtl: true, duration: 3 });

const App: React.FC = () => {
  const [locale] = useState(heIL);

  return (
    <ConfigProvider direction='rtl' locale={locale}>
      <ErrorBoundary>
        <Router history={history}>
          <Sidebar>
            <Routes></Routes>
          </Sidebar>
        </Router>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
