// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJqcRLp_AZffapS6q4hRWnTLOTgp3fkXI",
    authDomain: "app-tiwani.firebaseapp.com",
    projectId: "app-tiwani",
    storageBucket: "app-tiwani.firebasestorage.app",
    messagingSenderId: "1031038570606",
    appId: "1:1031038570606:web:a90059d1cf7abba3f4d67f",
    measurementId: "G-0R7SK7GVGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);