import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import heIL from 'antd/es/locale/he_IL';
import moment from 'moment';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
import Sidebar from 'components/sidebar/sidebar';
import Routes from './components/router/routes';
import history from './utils/history';

import 'moment/locale/he';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

moment.locale('he');

message.config({ rtl: true, duration: 3 });

const App: React.FC = () => {
  const [locale] = useState(heIL);

  const [componentSize, setComponentSize] = useState<SizeType>('middle');
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <ConfigProvider direction='rtl' componentSize={componentSize} locale={locale}>
          <Router history={history}>
            {
              //@ts-ignore
              <Sidebar setComponentSize={val => setComponentSize(val)}>
                <Routes></Routes>
              </Sidebar>
            }
          </Router>
        </ConfigProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
