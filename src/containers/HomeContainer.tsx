import { Home } from '../components/Home';
import { LoginState } from '../models/LoginState';
import * as React from 'react';
import { ListContainer } from './ListContainer';

export class HomeContainer extends React.Component<{login: LoginState},any>{

    render(){
        let render = this.props.login.isLoggedIn ? <ListContainer login={this.props.login} /> : <Home /> 
        return(
        <div>
            {render}
        </div>
        )
        
    }
}