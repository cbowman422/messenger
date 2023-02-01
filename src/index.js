import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App/App';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> 
    <App />  
  </Router>
);

{/* <React.StrictMode></React.StrictMode> */}