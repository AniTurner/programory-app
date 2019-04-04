  import firebase from 'firebase/app'
  import 'firebase/storage'

  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtzycXvlM5P9DXOroA9cVXGl0Zg5EJ4N8",
    authDomain: "programory-app.firebaseapp.com",
    databaseURL: "https://programory-app.firebaseio.com",
    projectId: "programory-app",
    storageBucket: "programory-app.appspot.com",
    messagingSenderId: "100727656362"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage()
  

  export {
      storage, firebase as default
  }