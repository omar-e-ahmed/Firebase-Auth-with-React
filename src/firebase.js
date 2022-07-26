//@ts-nocheck
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(app);

export const getIdToken = async () => {
  try {
    const getToken = await auth.currentUser.getIdToken();
    return getToken;
  } catch (e) {
    console.log("error occurred while getting id token");
  }
};

export default app;

// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);
