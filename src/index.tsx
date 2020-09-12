import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from 'components/context/firebase';
import initFirebase from './service/firebase/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={initFirebase()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
