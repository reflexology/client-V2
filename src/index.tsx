import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import '../src/styles/main.scss';

// import './wdyr';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();
