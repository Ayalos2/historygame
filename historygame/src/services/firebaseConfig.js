import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDYRtLt-qpNx3EzINS2AmMaM2uk08iWFUM",
  authDomain: "historygameifpe.firebaseapp.com",
  projectId: "historygameifpe",
  storageBucket: "historygameifpe.firebasestorage.app",
  messagingSenderId: "895315145428",
  appId: "1:895315145428:web:75755ea0aa9f7f38254141",
  measurementId: "G-HPHR141SEM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider};