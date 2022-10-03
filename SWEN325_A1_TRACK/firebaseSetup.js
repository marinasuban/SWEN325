// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiOz17vV2nbj3hSpy1chPkTi42ZY9ZAcg",
  authDomain: "track-auth.firebaseapp.com",
  projectId: "track-auth",
  storageBucket: "track-auth.appspot.com",
  messagingSenderId: "765448235567",
  appId: "1:765448235567:web:616c8bb21bbbefd85774da"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

// Initialise Auth
const auth = firebase.auth()
export{auth};

// Initialise FireStore
const db = firebase.firestore();
export{db};