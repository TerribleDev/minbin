import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { NavBar } from "./components/NavBar";
import { AppContainer } from "./containers/AppContainer";
import { LoginContainer } from "./containers/Login";
import {MainReducer} from "./reducers/MainReducer";
import rebase from "./startup/firebase";
const store = createStore(MainReducer);
const App = () => (
           <AppContainer />

  );

ReactDOM.render(
  <Provider store={store}>
   <App />
   </Provider>
   ,
    document.getElementById("example"),
);
