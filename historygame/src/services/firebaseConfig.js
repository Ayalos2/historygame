import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBlq08jA9JAgh449-cgs8BVXO5pDONfw0w",
    authDomain: "history-game-1f971.firebaseapp.com",
    projectId: "history-game-1f971",
    storageBucket: "history-game-1f971.appspot.com",
    messagingSenderId: "94458561479",
    appId: "1:94458561479:web:6622e0492aafc958ee4fe2",
    measurementId: "G-RYME9WHCPL"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };