import * as firebase from "firebase";
import * as Rebase from "re-base";

const config = {
  apiKey: "AIzaSyBi1oHDSe7juSTOZws30RkyXgv9u9ey-HA",
  authDomain: "minbin-784f1.firebaseapp.com",
  databaseURL: "https://minbin-784f1.firebaseio.com",
  projectId: "minbin-784f1",
  storageBucket: "minbin-784f1.appspot.com",
  messagingSenderId: "437102882585",
};
const app = firebase.initializeApp(config);
const db = firebase.database(app);
export default {db: firebase.database(app), rebase:  Rebase.createClass(db)};
