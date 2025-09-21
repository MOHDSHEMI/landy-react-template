import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvNtNL4m0zAyDEDtYZE4UUXkVsvEv6ZQc",
  authDomain: "dirt-be-gone.firebaseapp.com",
  projectId: "dirt-be-gone",
  storageBucket: "dirt-be-gone.firebasestorage.app",
  messagingSenderId: "841460820349",
  appId: "1:841460820349:web:fc298fa22bf4ea45674414",
  measurementId: "G-BL6VN6HM28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Export Firestore database instance
export const db = getFirestore(app);
