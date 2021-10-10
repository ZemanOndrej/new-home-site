import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from 'components/context/firebase';
import initFirebase from './service/firebase/firebase';
import 'font-awesome/css/font-awesome.min.css';
import { SettingsProvider, defaultSettings } from 'components/context/settings';
import { ModalProvider } from 'components/context/modal';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';
const theme = createTheme({
  palette: {
    primary: {
      main: '#242526',
    },
    secondary: {
      main: '#d975d0',
    },
    text: {
      primary: '#E4E6EB',
      secondary: '#B0B3B8',
    },
    background: {
      default: '#242526',
      paper: '#242526',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});
ReactDOM.render(
  <ThemeProvider theme={{ theme }}>
    <FirebaseContext.Provider value={initFirebase()}>
      <ModalProvider>
        <SettingsProvider settings={{ ...defaultSettings }}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SettingsProvider>
      </ModalProvider>
    </FirebaseContext.Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
