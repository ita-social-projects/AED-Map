import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from './store';

import { Provider } from 'react-redux';

// just for testing
// store.subscribe(() => {
// 	console.log(store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
