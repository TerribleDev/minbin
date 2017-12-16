import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Hello } from "./components/Hello";
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);


const App = () => (
    <MuiThemeProvider muiTheme={darkMuiTheme}>
       <Hello compiler="theme prov" framework="React" />
    </MuiThemeProvider>
  );
  
ReactDOM.render(
   <App />,
    document.getElementById("example")
);