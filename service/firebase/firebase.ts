import { config } from './config';
import { initializeApp, FirebaseApp } from 'firebase/app';

console.log(JSON.stringify(config));

const initFirebase = (): FirebaseApp => initializeApp(config);

export default initFirebase;
