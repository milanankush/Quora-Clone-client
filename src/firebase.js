// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLiAXJW7yN3yIqULz1H5PoBvELOs4YJIg",
  authDomain: "quora-clone-cafab.firebaseapp.com",
  projectId: "quora-clone-cafab",
  storageBucket: "quora-clone-cafab.appspot.com",
  messagingSenderId: "712895113999",
  appId: "1:712895113999:web:d5b003aed0fe6d26d6ac7a",
  measurementId: "G-B3P11N9DES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
