import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDpJDW46-Izn3CtPA0KUymS9w_-Slc3dk8",
  authDomain: "crown-db-c771a.firebaseapp.com",
  databaseURL: "https://crown-db-c771a.firebaseio.com",
  projectId: "crown-db-c771a",
  storageBucket: "crown-db-c771a.appspot.com",
  messagingSenderId: "797363626841",
  appId: "1:797363626841:web:5be5cb25b7d526b679e248",
  measurementId: "G-DVMNYHB4RV",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
