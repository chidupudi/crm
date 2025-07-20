// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration (same as consultancy app)
const firebaseConfig = {
  apiKey: "AIzaSyCK6R73AnP-82DAzuqgjXDGRtaKd7T0f3c",
  authDomain: "datenwork.firebaseapp.com",
  projectId: "datenwork",
  storageBucket: "datenwork.firebasestorage.app",
  messagingSenderId: "314141049278",
  appId: "1:314141049278:web:b67fbf8bd08a70db3a79ef",
  measurementId: "G-HEPHVH9K5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in CRM components
export { db, analytics, auth };
export default app;