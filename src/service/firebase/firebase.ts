import { config } from './config';
import app from 'firebase/app';

const initFirebase = (): app.app.App => app.initializeApp(config);

export default initFirebase;
