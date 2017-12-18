import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./components/Hello";
import 'bootstrap/dist/css/bootstrap.css';
import { TabNav } from './components/TabNav'
import { NavBar } from './components/NavBar'
import { BoostrapFirebase } from './startup/firebase'
import { LoginContainer } from './containers/Login'
import { createStore } from 'redux'
import {MainReducer} from './reducers/MainReducer'
import { Provider } from 'react-redux'
BoostrapFirebase();
let store = createStore(MainReducer)
const App = () => (
      <div className="app container-fluid">
        <NavBar>
          <LoginContainer/>
        </NavBar>
        <TabNav />
       </div>
       
  );
  
ReactDOM.render(
  <Provider store={store}>
   <App />
   </Provider>
   ,
    document.getElementById("example")
);