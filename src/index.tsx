import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from 'components/context/firebase';
import initFirebase from './service/firebase/firebase';
import 'font-awesome/css/font-awesome.min.css';
import { SettingsProvider, defaultSettings } from 'components/context/settings';
import { ModalProvider } from 'components/context/modal';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { grey, common } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: '#d975d0',
    },
    text: {
      primary: common.black,
      secondary: grey[400],
    },
    background: {
      default: common.black,
      paper: grey[100],
    },
  },
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <FirebaseContext.Provider value={initFirebase()}>
      <ModalProvider>
        <SettingsProvider settings={{ ...defaultSettings }}>
          <React.StrictMode>
            <CssBaseline />
            <App />
          </React.StrictMode>
        </SettingsProvider>
      </ModalProvider>
    </FirebaseContext.Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
