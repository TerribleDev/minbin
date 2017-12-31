import * as firebase from "firebase";
import * as React from "react";
import { Button } from "reactstrap";

export interface LoginButtonProps { onClick: React.MouseEventHandler<any>; }
export class LoginButton extends React.Component<LoginButtonProps, {}> {
    public render() {
        return <Button href="#" onClick={this.props.onClick} color="primary" outline>Login</Button>;
    }
}
