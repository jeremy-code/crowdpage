import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

type firebaseConfigType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const firebaseConfig: firebaseConfigType = {
  apiKey: "AIzaSyAe2DR1jVNp7ww7zaTZqNEiJsdRvy4icRY",
  authDomain: "social-media-app-60303.firebaseapp.com",
  projectId: "social-media-app-60303",
  storageBucket: "social-media-app-60303.appspot.com",
  messagingSenderId: "179755079031",
  appId: "1:179755079031:web:fb8b469c5acb4ea2127d72",
};

// Initialize Firebase with the config
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth() as firebase.auth.Auth;
export const googleAuthProvider =
  new firebase.auth.GoogleAuthProvider() as firebase.auth.GoogleAuthProvider;
export const firestore = firebase.firestore() as firebase.firestore.Firestore;
export const storage = firebase.storage() as firebase.storage.Storage;
