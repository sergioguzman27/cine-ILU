import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import createHistory from 'history/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/styles/index.scss'

let initialState = {};

// rehydrate initialState for JS app
if (window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__;

  // Transform into Immutable.js collections,
  // but leave top level keys untouched for Redux
  Object
    .keys(initialState)
    .forEach((key) => {
      initialState[key] = fromJS(initialState[key]);
    });
}

const hashHistory = createHistory();
const store = configureStore(initialState, hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(<Root history={history} store={store}/>, document.getElementById('app'));
// registerServiceWorker();
module.hot.accept();
