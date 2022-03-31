import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD-zNewbSdgIxuO0CtHYeoHQQEVOusf6Tw",
    authDomain: "cookery-book-40441.firebaseapp.com",
    projectId: "cookery-book-40441",
    storageBucket: "cookery-book-40441.appspot.com",
    messagingSenderId: "222206364989",
    appId: "1:222206364989:web:fb6ccbcea537920b0b8954",
};

initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth();
export const FIRESTORE = getFirestore();
export const FIREBASE_STORAGE = getStorage();
