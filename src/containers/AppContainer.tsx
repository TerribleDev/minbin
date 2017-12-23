import { Edit } from './Edit';
import { LoginContainer } from './Login';
import { NavBar } from '../components/NavBar';
import * as React from 'react';
import * as redux from 'redux';
import {Store} from "redux"
import { connect } from 'react-redux';
import { AppState } from '../models/AppState';
import { Route, RouteProps, RouterChildContext, RouteComponentProps, Redirect } from 'react-router';
import { ForOhFour } from '../components/ForOhFour'
import {generateDocId} from '../util/doc'
const mapStateToProps = (state : AppState) : AppState  =>
{
    return state;
}; 
class appContainer extends React.Component<AppState, any>{
    render(){
        return <div className="app container-fluid">
        <NavBar>
          <LoginContainer/>
        </NavBar>
        <Route path="/d/:uid/:docId*" render={(routeProps: RouteComponentProps<{docId?: string, uid?: string}>)=>{
            if(!routeProps.match.params.uid){
                return <ForOhFour />
            }
            if(!routeProps.match.params.docId){
                return <Redirect to={`/d/${routeProps.match.params.uid}/${generateDocId()}`} />
            }
            return <Edit login={this.props.login} docId={routeProps.match.params.docId} />
        }} />
       </div>
    }

}

export const AppContainer = connect(mapStateToProps)(appContainer)