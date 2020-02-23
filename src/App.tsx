import React, { useState } from 'react';
import Routes from './components/router/routes';
import { Router } from 'react-router-dom';
import history from './utils/history';
import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
import { ConfigProvider } from 'antd';
import heIL from 'antd/es/locale/he_IL';
import moment from 'moment';
import 'moment/locale/he';

moment.locale('he');

const App: React.FC = () => {
  const [locale] = useState(heIL);
  return (
    <ConfigProvider direction='rtl' locale={locale}>
      <ErrorBoundary>
        <Router history={history}>
          <Routes></Routes>
        </Router>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
