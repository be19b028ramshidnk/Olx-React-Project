import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import { firebaseApp, auth, db, storage } from './firebase/config';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <FirebaseContext.Provider value={{ firebaseApp, auth, db, storage }}>
    <App />
  </FirebaseContext.Provider>
);

reportWebVitals();

