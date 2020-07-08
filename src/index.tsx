import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import '../src/styles/main.scss';
import './wdyr';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
