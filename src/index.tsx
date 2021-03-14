import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from 'components/context/firebase';
import initFirebase from './service/firebase/firebase';
import 'font-awesome/css/font-awesome.min.css';
import { SettingsProvider, defaultSettings } from 'components/context/settings';
ReactDOM.render(
  <FirebaseContext.Provider value={initFirebase()}>
    <SettingsProvider settings={{ ...defaultSettings }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SettingsProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
