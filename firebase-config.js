// Firebase Configuration
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBIKDroOgTzmS1Z1jq2GuYySQQRwl2sDZ8",
    authDomain: "knowledge-hub-6eaf8.firebaseapp.com",
    projectId: "knowledge-hub-6eaf8",
    storageBucket: "knowledge-hub-6eaf8.firebasestorage.app",
    messagingSenderId: "18288391863",
    appId: "1:18288391863:web:d2bdc1229da31f6091ff32",
    measurementId: "G-NPDBTGBCRD"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();
    console.log('✅ Firebase initialized successfully!');
    console.log('📊 Project: knowledge-hub-6eaf8');
    console.log('🔥 Firestore Database: Connected');
    console.log('🔐 Authentication: Ready');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Get these from your Firebase Console: https://console.firebase.google.com