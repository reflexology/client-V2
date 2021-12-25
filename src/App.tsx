import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import heIL from 'antd/es/locale/he_IL';
import moment from 'moment';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
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
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ConfigProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
