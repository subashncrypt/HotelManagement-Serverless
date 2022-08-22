// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAt4irWYKPMFcwfhra-rA-l08PYdXIUbFk",
  authDomain: "serverless-18.firebaseapp.com",
  projectId: "serverless-18",
  storageBucket: "serverless-18.appspot.com",
  messagingSenderId: "1069880933330",
  appId: "1:1069880933330:web:91c8478ac2960dc4f3660b",
  measurementId: "G-56T9FQTV0H",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default {
  db,
  firebase,
};

// export const db = getFirestore(firebaseApp);
