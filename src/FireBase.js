// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9vh73nr5AwnJXTGo-HEYeQWhaXX_Hf3Y",
  authDomain: "ayo-chat-5455c.firebaseapp.com",
  projectId: "ayo-chat-5455c",
  storageBucket: "ayo-chat-5455c.appspot.com",
  messagingSenderId: "63395791043",
  appId: "1:63395791043:web:d9acb81f33ba49142ba276"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app)