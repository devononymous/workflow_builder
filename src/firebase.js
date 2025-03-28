// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9iQgMynpq-1MoVLWAGwHKLSR5u2HKfMk",
  authDomain: "workflowmanagement-64e66.firebaseapp.com",
  projectId: "workflowmanagement-64e66",
  storageBucket: "workflowmanagement-64e66.firebasestorage.app",
  messagingSenderId: "545957892719",
  appId: "1:545957892719:web:e4a4aaf3de3b89e0b6739a",
  measurementId: "G-7QWT47P5Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);