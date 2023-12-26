import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrwNtygod6wC3dwnc7MGhwsVkUrc_AQ_k',
  authDomain: 'postonce-ed9fb.firebaseapp.com',
  projectId: 'postonce-ed9fb',
  storageBucket: 'postonce-ed9fb.appspot.com',
  messagingSenderId: '594951104884',
  appId: '1:594951104884:web:c2b763709e04e6bd8c2421',
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export  { firebaseApp, firestore };