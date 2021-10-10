import { config } from './config';

export interface EmailData {
  subject: string;
  message: string;
  name: string;
  email: string;
  appInfo: string;
}

const address = config.emailServerAddress || '';

export const sendEmail = async (data: EmailData): Promise<Response> => {
  return fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
