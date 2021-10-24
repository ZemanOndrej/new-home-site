import { config } from './config';
import { initializeApp, FirebaseApp } from 'firebase/app';

const initFirebase = (): FirebaseApp => initializeApp(config);

export default initFirebase;
