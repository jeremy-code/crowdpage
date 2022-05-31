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

/// Helper functions

/**`
 * Gets a users/{uid} document from firestore with username
 * @param {string} username
 */

export async function getUserWithUsername(username: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to a JSON object
 * @param {firebase.firestore.DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
