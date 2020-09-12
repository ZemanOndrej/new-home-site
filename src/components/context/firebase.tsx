import app from 'firebase/app';
import React from 'react';

const FirebaseContext = React.createContext<app.app.App | null>(null);

export { FirebaseContext };
