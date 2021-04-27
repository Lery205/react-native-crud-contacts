import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCvZUcqG0oE2XGGMs7imPCwFB7ybppapXw",
    authDomain: "myrecipes-e75d8.firebaseapp.com",
    projectId: "myrecipes-e75d8",
    storageBucket: "myrecipes-e75d8.appspot.com",
    messagingSenderId: "18460058455",
    appId: "1:18460058455:web:e5c8d7f1b6c2fcb532d412",
    measurementId: "G-PZ6WLNKGZG"
  };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore()

   export default {
       firebase , db
   }