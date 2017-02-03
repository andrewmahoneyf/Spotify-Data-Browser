import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component
import DataController from './DataController';

//load our CSS file
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

//render the Application view
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
