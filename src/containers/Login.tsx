import * as firebase from "firebase";
import * as React from "react";
import * as reactRedux from "react-redux";
import { connect, Dispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import * as redux from "redux";
import { Action, Reducer } from "redux";
import * as actions from "../actions/loginActions";
import { LoginButton } from "../components/LoginButton";
import {AppState} from "../models/AppState";
import { LoginState } from "../models/LoginState";

const mapStateToProps = (state: AppState): IBaseLoginProps  => {
        return {loginState: state.login};
    };
const mapDispatchToProps  = (dispatch: (action: Action) => any): IBaseLoginDispatches => {
    return {
        onLogin: (loginState: LoginState) => dispatch(actions.login(loginState)),
        onLogOut: () => dispatch(actions.logout()),
    };
};
interface IBaseLoginProps {loginState: LoginState; }
interface IBaseLoginDispatches {onLogin: (loginState: LoginState) => any; onLogOut: () => any; }
interface ILoginProps extends IBaseLoginProps, IBaseLoginDispatches {}
class loginContainer extends React.Component<ILoginProps, {}> {

    constructor(props: ILoginProps) {
        super(props);
        firebase.auth().onAuthStateChanged((e) => this.handleLogin(e));

    }

    public handleLogin(user: firebase.User) {
        if (user) {
            this.props.onLogin({isLoggedIn: true, displayName: user.displayName, uid: user.uid});

          } else {
              this.props.onLogOut();
          }
    }
    public logout() {
        firebase.auth().signOut()
        .then(() => this.props.onLogOut());

    }
    public login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => firebase.auth().signInWithPopup(provider).then((result) => { return; }));
    }
    //todo I should seperate the UI layer from the login business logic, redux posting
    public render() {

        if (this.props && this.props.loginState && this.props.loginState.isLoggedIn) {
            return <span style={{verticalAlign: "middle"}}>&nbsp; Hi, {this.props.loginState.displayName} <a href="#" onClick={() => this.logout()}>Log Out</a> </span>;
        } else {
            return <LoginButton onClick={this.login} />;
        }

    }
}
export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(loginContainer);
