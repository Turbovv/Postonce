import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6U_EMrZpVPTVvEBCJ6khsF5cYx_9y4o4",
  authDomain: "postonce-f68b9.firebaseapp.com",
  projectId: "postonce-f68b9",
  storageBucket: "postonce-f68b9.appspot.com",
  messagingSenderId: "274444771451",
  appId: "1:274444771451:web:c4fc1cef9a97a9913942de",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const citiesColRef = collection(firestore, "posts");

export { firebaseApp, firestore, citiesColRef };
