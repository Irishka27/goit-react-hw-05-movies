import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/goit-react-hw-05-movies/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
