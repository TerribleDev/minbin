import * as firebase from "firebase"


  export function BoostrapFirebase(){
    var config = {
        apiKey: "AIzaSyBi1oHDSe7juSTOZws30RkyXgv9u9ey-HA",
        authDomain: "minbin-784f1.firebaseapp.com",
        databaseURL: "https://minbin-784f1.firebaseio.com",
        projectId: "minbin-784f1",
        storageBucket: "minbin-784f1.appspot.com",
        messagingSenderId: "437102882585"
    };
    firebase.initializeApp(config);
  }