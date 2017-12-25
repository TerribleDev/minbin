import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { NavBar } from './components/NavBar'
import rebase from './startup/firebase'
import { LoginContainer } from './containers/Login'
import { createStore } from 'redux'
import {MainReducer} from './reducers/MainReducer'
import { Provider } from 'react-redux'
import { AppContainer } from "./containers/AppContainer";
import { BrowserRouter } from "react-router-dom";
let store = createStore(MainReducer)
const App = () => (
           <AppContainer /> 
  
       
  );
  
ReactDOM.render(
  <Provider store={store}>
   <App />
   </Provider>
   ,
    document.getElementById("example")
);