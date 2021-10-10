export interface EmailData {
  subject: string;
  message: string;
  name: string;
  email: string;
  appInfo: string;
}

const devConfig = {
  address: process.env.REACT_APP_DEV_MAIL_SERVICE_ADDRESS,
};
const prodConfig = {
  address: process.env.REACT_APP_PROD_MAIL_SERVICE_ADDRESS,
};
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export const sendEmail = async (data: EmailData): Promise<Response> => {
  return fetch(config.address || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
