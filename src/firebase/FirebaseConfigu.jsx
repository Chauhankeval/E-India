
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDCabLiZBRoeZ8jlJGUek4H2JgHaY13Ux4",
  authDomain: "my-project-a4726.firebaseapp.com",
  projectId: "my-project-a4726",
  storageBucket: "my-project-a4726.appspot.com",
  messagingSenderId: "864057928816",
  appId: "1:864057928816:web:bd968c144ad98efe4198b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;