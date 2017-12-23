import { LoginState } from '../models/LoginState';
import { Edit } from './Edit';
import { LoginContainer } from './Login';
import { NavBar } from '../components/NavBar';
import * as React from 'react';
import * as redux from 'redux';
import {Store} from "redux"
import { connect } from 'react-redux';
import { AppState } from '../models/AppState';
import { Route, RouteProps, RouterChildContext, RouteComponentProps, Redirect, Switch } from 'react-router';
import { ForOhFour } from '../components/ForOhFour'
import {generateDocId} from '../util/doc'
import { BrowserRouter } from 'react-router-dom';
const mapStateToProps = (state : AppState) : AppState  =>
{
    return state;
}; 
class appContainer extends React.Component<AppState, any>{
    render(){
        return <BrowserRouter><div className="app container-fluid">
        <NavBar>
          <LoginContainer/>
        </NavBar>
        <Switch>
        <Route path="/d/new" render={()=>{
            return <Redirect to={`/d/${this.props.login.uid}/${generateDocId()}`} />
        }} />
        <Route path="/d/:uid/:docId/:edit" render={(routeProps: RouteComponentProps<{docId?: string, uid?: string, login: LoginState, edit: string}>)=>{
            var showEdit;
            if(routeProps.match.params.edit === "edit"){
                showEdit = true;
            }
            else{
                showEdit = false;
            }
            return <Edit login={this.props.login} uid={routeProps.match.params.uid} docId={routeProps.match.params.docId} showEdit={showEdit} />
        }} />
        <Route path="/d/:uid/:docId" render={(routeProps: RouteComponentProps<{docId?: string, uid?: string, login: LoginState}>)=>{
     
            return <Redirect to={`/d/${routeProps.match.params.uid}/${routeProps.match.params.docId}/view`} />
        }} />
        <Route component={ForOhFour} />
        </Switch>
       </div></BrowserRouter>
    }

}

export const AppContainer = connect(mapStateToProps)(appContainer)