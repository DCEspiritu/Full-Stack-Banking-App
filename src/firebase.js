import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAsjJwBnu9wiXDWjqUbE7e15-7rbRT2Bcs",
  authDomain: "goodbank-a244a.firebaseapp.com",
  databaseURL: "https://goodbank-a244a-default-rtdb.firebaseio.com",
  projectId: "goodbank-a244a",
  storageBucket: "goodbank-a244a.appspot.com",
  messagingSenderId: "767673919258",
  appId: "1:767673919258:web:7d6da86b63b764f0e22ea3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export the Firebase authentication object and database object
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);

export default firebaseApp;