import { LoginState } from '../models/LoginState';
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand, Navbar } from 'reactstrap';
import { LoginContainer } from '../containers/Login';
import { Link } from 'react-router-dom';

export class NavBar extends React.Component<{loginState: LoginState}, any> {
  constructor(props: any) {
    super(props);

  }

  render() {
    let newButton = this.props.loginState.isLoggedIn ? (
      <NavItem>
          <Link to="/d/new" className="btn btn-sm btn-outline-success" >+ New</Link>
          </NavItem>
    ) : null;
    return (
      <div>
        <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">minbin</NavbarBrand>
        
        <Nav navbar className="ml-auto">
          {newButton}
          <NavItem>
              <LoginContainer />
          </NavItem>
        </Nav>
        </Navbar>
      </div>
    );
  }
}
