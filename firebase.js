// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAeXtwjK93rMYEbaEliOcERz6T31DAEML0",
  authDomain: "funcareappbusiness.firebaseapp.com",
  projectId: "funcareappbusiness",
  storageBucket: "funcareappbusiness.appspot.com",
  messagingSenderId: "517885191834",
  appId: "1:517885191834:web:21d6ab73dd54001f362123",
  measurementId: "G-VF2YHXDNDD",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
