// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvvFTkPKi_ahfpe2yW3bwRbdS5s97q3Ss",
  authDomain: "vibrant-keyword-357805.firebaseapp.com",
  projectId: "vibrant-keyword-357805",
  storageBucket: "vibrant-keyword-357805.appspot.com",
  messagingSenderId: "631999836118",
  appId: "1:631999836118:web:147702521fe3974924fe77",
  measurementId: "G-Q5GXT21W46"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users')
}
export const storage = firebase.storage();