// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMmStXSiG6LdgMrQO6XDXMhinVjqqmsv8",
  authDomain: "miniblog-ebf4c.firebaseapp.com",
  projectId: "miniblog-ebf4c",
  storageBucket: "miniblog-ebf4c.appspot.com",
  messagingSenderId: "705845933837",
  appId: "1:705845933837:web:3a99646636c2601384a244",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
