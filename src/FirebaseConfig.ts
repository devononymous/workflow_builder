import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9iQgMynpq-1MoVLWAGwHKLSR5u2HKfMk",
  authDomain: "workflowmanagement-64e66.firebaseapp.com",
  projectId: "workflowmanagement-64e66",
  storageBucket: "workflowmanagement-64e66.appspot.com",
  messagingSenderId: "545957892719",
  appId: "1:545957892719:web:e4a4aaf3de3b89e0b6739a",
  measurementId: "G-7QWT47P5Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence (optional)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Initialize Analytics (optional)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { auth, analytics };