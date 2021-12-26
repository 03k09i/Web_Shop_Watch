// import 'react-app-polyfill/ie11'; // For IE 11 support
// import 'react-app-polyfill/stable';
// import 'core-js';
// //import './polyfill'
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// import { icons } from './assets/icons'

// import { Provider } from 'react-redux'
// import store from './store'

// React.icons = icons

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/config-store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
