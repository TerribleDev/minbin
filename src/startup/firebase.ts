import * as firebase from "firebase"
import * as Rebase from "re-base"

let config = {
  apiKey: "AIzaSyBi1oHDSe7juSTOZws30RkyXgv9u9ey-HA",
  authDomain: "minbin-784f1.firebaseapp.com",
  databaseURL: "https://minbin-784f1.firebaseio.com",
  projectId: "minbin-784f1",
  storageBucket: "minbin-784f1.appspot.com",
  messagingSenderId: "437102882585"
};
let app = firebase.initializeApp(config);
let db = firebase.database(app);
export default {db:firebase.database(app), rebase:  Rebase.createClass(db)}