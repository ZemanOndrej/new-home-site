import { FirebaseApp } from 'firebase/app';
import React from 'react';

const FirebaseContext = React.createContext<FirebaseApp | undefined>(undefined);

export { FirebaseContext };
