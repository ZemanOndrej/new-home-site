import { config } from './config';

export interface EmailData {
  subject: string;
  message: string;
  name: string;
  email: string;
  appInfo: string;
}

const address = config.emailServerAddress || '';

const emailStatusKey = 'email_status_code';

export const sendEmail = async (data: EmailData): Promise<Response> => {
  return fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const saveEmailStatus = (sentSuccessfully: Date): void => {
  localStorage.setItem(emailStatusKey, sentSuccessfully.getTime().toString());
};

export const getEmailStatus = (): Date | null => {
  const date = localStorage.getItem(emailStatusKey);
  return date ? new Date(date) : null;
};
