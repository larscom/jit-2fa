import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

getAnalytics(
  initializeApp({
    apiKey: 'AIzaSyAMKlJYmXlRTGmMCXJso0KYHqZCX5cAYW0',
    authDomain: 'jit-2fa.firebaseapp.com',
    projectId: 'jit-2fa',
    storageBucket: 'jit-2fa.appspot.com',
    messagingSenderId: '735249302962',
    appId: '1:735249302962:web:15ca2c6a38ae8e28b510ab',
    measurementId: 'G-J35KQWC200'
  })
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
