import firebase from 'firebase/app';
import 'firebase/storage';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyA6n_nF9Qgveh_a0VULmgeHmEz6R6_lHRM",
    authDomain: "programory-app1.firebaseapp.com",
    databaseURL: "https://programory-app1.firebaseio.com",
    projectId: "programory-app1",
    storageBucket: "programory-app1.appspot.com",
    messagingSenderId: "406730369213"
  };
  firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
