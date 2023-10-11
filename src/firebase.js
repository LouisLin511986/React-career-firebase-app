import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8KfpOdvBZ9JIS94DRy1JgPdTIOq0iurQ",
    authDomain: "career-firebase-app-130ad.firebaseapp.com",
    projectId: "career-firebase-app-130ad",
    storageBucket: "career-firebase-app-130ad.appspot.com",
    messagingSenderId: "1015120380496",
    appId: "1:1015120380496:web:59d88df6bbf0911bab0755"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth, db }