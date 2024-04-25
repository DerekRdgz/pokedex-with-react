import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, onSnapshot, writeBatch, doc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDFV1lG_NkWoALQBM20ene5eaGXQ4h99oo",
  authDomain: "pokedex-4c2d2.firebaseapp.com",
  projectId: "pokedex-4c2d2",
  storageBucket: "pokedex-4c2d2.appspot.com",
  messagingSenderId: "730593945441",
  appId: "1:730593945441:web:8dbbb9eb7ff8371f560720",
  measurementId: "G-YP88FM21F5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, collection, addDoc, query, where, onSnapshot, writeBatch, doc };