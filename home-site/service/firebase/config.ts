const devConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_DEV_API_KEY ?? 'admin test',
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_DEV_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_DEV_ID,
  emailServerAddress:
    process.env.NEXT_PUBLIC_REACT_APP_DEV_MAIL_SERVICE_ADDRESS,
};
const prodConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_PROD_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_PROD_MESSAGING_SENDER_ID,
  emailServerAddress:
    process.env.NEXT_PUBLIC_REACT_APP_PROD_MAIL_SERVICE_ADDRESS,
};
export const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
