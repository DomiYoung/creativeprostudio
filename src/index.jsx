import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CreativeDemo from './CreativeDemo.jsx';
import UIShowcase from './UIShowcase.jsx';
import DocCenter from './DocCenter.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DocCenter />
    {/* <UIShowcase /> */}
    {/* <CreativeDemo /> */}
    {/* <App /> */}
  </React.StrictMode>
);