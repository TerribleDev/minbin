import { Reducer } from 'redux';
import * as actions from '../actions/loginActions';
import { LoginState } from '../models/LoginState';
import * as React from 'react';
import * as firebase from 'firebase';
import { LoginButton } from "../components/LoginButton"
import * as reactRedux from 'react-redux';
import {AppState} from '../models/AppState'
import { Dispatch, connect } from 'react-redux';
import * as redux from 'redux';

const mapStateToProps = (state : AppState) : IBaseLoginProps  =>
    {
        return {loginState: state.login};
    }
const mapDispatchToProps  = (dispatch: (Action)=>any) : IBaseLoginDispatches => {
    return {
        onLogin:(loginState: LoginState) => dispatch(actions.login(loginState)),
        onLogOut:() => dispatch(actions.logout())
    }
}
interface IBaseLoginProps {loginState: LoginState}
interface IBaseLoginDispatches {onLogin: (loginState: LoginState)=>any, onLogOut: ()=>any}
interface ILoginProps extends IBaseLoginProps,IBaseLoginDispatches {}
class loginContainer extends React.Component<ILoginProps,{}>{

    constructor(props: any){
        super(props, {isLoggedIn: false, displayName: '', uid: null}) 
        firebase.auth().onAuthStateChanged((e)=>this.handleLogin(e));
                 
    }

    handleLogin(user: firebase.User){
        if (user) {
            this.props.onLogin({isLoggedIn: true, displayName: user.displayName, uid: user.uid})
            
          } else {
              this.props.onLogOut()
          }
    }
    async logout(){
        await firebase.auth().signOut()
        this.props.onLogOut()
    }
    login(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {});
    }
    render(){
        
            
        if(this.props && this.props.loginState && this.props.loginState.isLoggedIn){
            return <span> Hi, {this.props.loginState.displayName} <a href="#" onClick={()=>this.logout()}>Log Out</a> </span>
        }
        else{
            return <LoginButton onClick={this.login} />
        }
      
    }
}
export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(loginContainer)