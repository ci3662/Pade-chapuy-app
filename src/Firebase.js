import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPQHxBRPUoA7aPsfyhrH8ruYewv_iIFoY",
  authDomain: "padel-chapuy-turnos-5d081.firebaseapp.com",
  projectId: "padel-chapuy-turnos-5d081",
  storageBucket: "padel-chapuy-turnos-5d081.appspot.com",
  messagingSenderId: "710374409482",
  appId: "1:710374409482:web:d07c5278a2d285055b26f3"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export { db };
