import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps, RouterChildContext, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as redux from "redux";
import {Store} from "redux";
import { ForOhFour } from "../components/ForOhFour";
import { NavBar } from "../components/NavBar";
import { AppState } from "../models/AppState";
import { LoginState } from "../models/LoginState";
import {generateDocId} from "../util/doc";
import { Edit } from "./Edit";
import { HomeContainer } from "./HomeContainer";
import { LoginContainer } from "./Login";
const mapStateToProps = (state: AppState): AppState  => {
    return state;
};
class appContainer extends React.Component<AppState, any> {
    public render() {
        return <BrowserRouter><div className="app container-fluid">
        <NavBar loginState={this.props.login} />
        <Switch>
        <Route path="/d/new" render={() => {
            return <Redirect to={`/d/${this.props.login.uid}/${generateDocId()}`} />;
        }} />
        <Route path="/d/:uid/:docId/:edit" render={(routeProps: RouteComponentProps<{docId?: string, uid?: string, login: LoginState, edit: string}>) => {
            let showEdit;
            if (routeProps.match.params.edit === "edit") {
                showEdit = true;
            } else {
                showEdit = false;
            }
            return <Edit login={this.props.login} uid={routeProps.match.params.uid} docId={routeProps.match.params.docId} showEdit={showEdit} />;
        }} />
        <Route path="/d/:uid/:docId" render={(routeProps: RouteComponentProps<{docId?: string, uid?: string, login: LoginState}>) => {

            return <Redirect to={`/d/${routeProps.match.params.uid}/${routeProps.match.params.docId}/view`} />;
        }} />
        <Route path="/" strict={true}>
            <HomeContainer login={this.props.login} />
        </Route>
        <Route component={ForOhFour} />
        </Switch>
       </div></BrowserRouter>;
    }

}

export const AppContainer = connect(mapStateToProps)(appContainer);
