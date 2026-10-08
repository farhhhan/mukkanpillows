import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUyYNDQSNAyNcsuK6ZnTC461kzmnavKro",
  authDomain: "mukkanspillows.firebaseapp.com",
  projectId: "mukkanspillows",
  storageBucket: "mukkanspillows.firebasestorage.app",
  messagingSenderId: "897630453252",
  appId: "1:897630453252:web:4e118825bfd2684906ff51",
  measurementId: "G-7SZ6RKPWM7"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
