import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Listing from './Listing';
import Customers from './customers'
import Sales from './sales'
import AddingPayements from './addingPayements'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Statement from './customerStatement'
import AppRouter from './config/Router'

ReactDOM.render(
  <React.StrictMode>
 <AppRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
