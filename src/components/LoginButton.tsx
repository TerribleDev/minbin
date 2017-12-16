import * as React from 'react'
import { Button } from 'reactstrap';
import * as firebase from 'firebase'

export interface LoginProps { onClick: React.MouseEventHandler<any> }
export class LoginButton extends React.Component<LoginProps, {}>{
    render(){
        return <Button href="#" onClick={this.props.onClick} color="primary" outline>Login</Button>
    }
}