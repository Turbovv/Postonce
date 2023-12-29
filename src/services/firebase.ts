import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDpVZw_Es_bCyTK00kiu053UE1QgWgmms",
  authDomain: "postonce-36346.firebaseapp.com",
  projectId: "postonce-36346",
  storageBucket: "postonce-36346.appspot.com",
  messagingSenderId: "891985361865",
  appId: "1:891985361865:web:0fd5966844f33e27548618",
  measurementId: "G-RM6FMMDHY4"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export  { firebaseApp, firestore };