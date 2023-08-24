import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
      apiKey: "AIzaSyDpKTM3gfRYiYXOPAREtLgM2tLrI1ZDNVQ",
      authDomain: "react-app-planner.firebaseapp.com",  
      projectId: "react-app-planner",
      storageBucket: "react-app-planner.appspot.com",
      messagingSenderId: "295639782682",
      appId: "1:295639782682:web:d86be5902eb6a12fdc88a3",
    measurementId: "G-76LXPLYK1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


