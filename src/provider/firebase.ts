import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDClMTFgLYeHv60pNoMyk9tsaUG3qwuz8k",
  authDomain: "clonespotify-98166.firebaseapp.com",
  projectId: "clonespotify-98166",
  storageBucket: "clonespotify-98166.appspot.com",
  messagingSenderId: "950609807889",
  appId: "1:950609807889:web:01d8d65a78540206d4ffb0",
  measurementId: "G-52DFEMTQCQ",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;
