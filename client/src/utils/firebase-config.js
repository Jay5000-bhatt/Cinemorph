// Import the specific Firebase modules you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyAubo-QIqjUaxVkiTHcZ0kF_nU9cn8VaLc",
  authDomain: "cinemorph-video-streaming-app.firebaseapp.com",
  databaseURL:
    "https://cinemorph-video-streaming-app-default-rtdb.firebaseio.com",
  projectId: "cinemorph-video-streaming-app",
  storageBucket: "cinemorph-video-streaming-app.appspot.com",
  messagingSenderId: "17690021099",
  appId: "1:17690021099:web:0da829c2b2f3420444c2ae",
  measurementId: "G-K610XCY1H5",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Auth and Database instances
const firebaseAuth = getAuth(app);
const firebaseDatabase = getDatabase();

// Export Firebase Auth and Database instances
export { firebaseAuth, firebaseDatabase };
