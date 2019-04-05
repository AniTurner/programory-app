import firebase from 'firebase/app';
import 'firebase/storage';

 // Initialize Firebase
 var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "programory-app1-b40d2.firebaseapp.com",
    databaseURL: "https://programory-app1-b40d2.firebaseio.com",
    projectId: "programory-app1-b40d2",
    storageBucket: "programory-app1-b40d2.appspot.com",
    messagingSenderId: "569150614995"
  };
  firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
