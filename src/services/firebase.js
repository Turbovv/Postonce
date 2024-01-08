import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance

var firebaseConfig = {
  apiKey: "AIzaSyB6U_EMrZpVPTVvEBCJ6khsF5cYx_9y4o4",
  authDomain: "postonce-f68b9.firebaseapp.com",
  projectId: "postonce-f68b9",
  storageBucket: "postonce-f68b9.appspot.com",
  messagingSenderId: "274444771451",
  appId: "1:274444771451:web:c4fc1cef9a97a9913942de",
  measurementId: "G-1HVFGG1E9M"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
