import * as React from "react";
import { Home } from "../components/Home";
import { LoginState } from "../models/LoginState";
import { ListContainer } from "./ListContainer";

export class HomeContainer extends React.Component<{login: LoginState}, any> {

    public render() {
        const render = this.props.login.isLoggedIn ? <ListContainer login={this.props.login} /> : <Home />;
        return(
        <div>
            {render}
        </div>
        );

    }
}
