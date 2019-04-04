import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "programory-app.firebaseapp.com",
    databaseURL: "https://programory-app.firebaseio.com",
    projectId: "programory-app",
    storageBucket: "programory-app.appspot.com",
    messagingSenderId: "100727656362"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
