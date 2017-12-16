import * as React from "react";
import * as firebase from "firebase"
import { LoginButton } from "../components/LoginButton"
export interface LoginState { isLoggedIn: Boolean; displayName: string; uid: string }

export class LoginContainer extends React.Component<{}, LoginState>{

    constructor(props: any){
        super(props, {isLoggedIn: false, displayName: '', uid: null}) 
        firebase.auth().onAuthStateChanged((e)=>this.handleLogin(e));
                 
    }
    handleLogin(user: firebase.User){
        if (user) {
            this.setState({isLoggedIn: true, displayName: user.displayName, uid: user.uid})
            
          } else {
              this.setState({isLoggedIn: false})
          }
    }
    async logout(){
        await firebase.auth().signOut()
        this.setState({isLoggedIn: false, displayName: '', uid: ''})
    }
    login(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
        });
    }
    render(){
        
            
        if(this.state && this.state.isLoggedIn){
            return <span> Hi, {this.state.displayName} <a href="#" onClick={()=>this.logout()}>Log Out</a> </span>
        }
        else{
            return <LoginButton onClick={this.login} />
        }
      
    }
}