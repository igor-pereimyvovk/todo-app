import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAU5XrA9MNLCVwfNSB_UxLKpIhfqOP10uI',
  authDomain: 'todo-app-4ae3c.firebaseapp.com',
  projectId: 'todo-app-4ae3c',
  storageBucket: 'todo-app-4ae3c.firebasestorage.app',
  messagingSenderId: '368256323983',
  appId: '1:368256323983:web:200ed30eadddd4bbbdfbfa',
  measurementId: 'G-RTJJTKYP58',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
