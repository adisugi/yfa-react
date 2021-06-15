import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();
