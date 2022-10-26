const devConfig = {
  database: process.env.NEXT_PUBLIC_REACT_APP_DEV_DATABASE_URL,
};
const prodConfig = {
  database: process.env.NEXT_PUBLIC_REACT_APP_PROD_DATABASE_URL,
};
export const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
