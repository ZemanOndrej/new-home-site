import '../styles/globals.css';
import 'font-awesome/css/font-awesome.min.css';
import 'styles/landing.css';

import type { AppProps } from 'next/app';
import { FirebaseContext } from '../components/context/firebase';
import initFirebase from 'service/firebase';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { defaultSettings, SettingsProvider } from 'components/context/settings';
import { ModalProvider } from '../components/context/modal';
import { theme } from 'styles/theme';
import createEmotionCache from 'styles/theme/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
function MyApp({ pageProps, Component }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <FirebaseContext.Provider value={initFirebase()}>
          <ModalProvider>
            <SettingsProvider settings={{ ...defaultSettings }}>
              <CssBaseline />
              <Component {...pageProps} />
            </SettingsProvider>
          </ModalProvider>
        </FirebaseContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
