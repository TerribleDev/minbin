import { LoginContainer } from './Login';
import { TabNav } from '../components/TabNav';
import { NavBar } from '../components/NavBar';
import * as React from 'react';
import * as redux from 'redux';
import {Store} from "redux"
import { connect } from 'react-redux';
import { AppState } from '../models/AppState';

const mapStateToProps = (state : AppState) : AppState  =>
{
    return state;
}; 
class appContainer extends React.Component<AppState, {}>{

    render(){
        return <div className="app container-fluid">
        <NavBar>
          <LoginContainer/>
        </NavBar>
        <TabNav login={this.props.login} />
       </div>
    }

}

export const AppContainer = connect(mapStateToProps)(appContainer)