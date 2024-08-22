import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFA68TYFdmYKwdKpW7tcgf55l_UsKX5Ks",
    authDomain: "olxclone-3ff65.firebaseapp.com",
    projectId: "olxclone-3ff65",
    storageBucket: "olxclone-3ff65.appspot.com",
    messagingSenderId: "362583050507",
    appId: "1:362583050507:web:62020269da7db84ddb3a0e",
    measurementId: "G-PWH5TN7R41"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Export the initialized services for use in your application
export { firebaseApp, auth, db, storage, firestore };