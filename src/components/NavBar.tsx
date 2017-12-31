import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle, Col, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { LoginContainer } from "../containers/Login";
import { LoginState } from "../models/LoginState";

export class NavBar extends React.Component<{loginState: LoginState}, any> {
  constructor(props: any) {
    super(props);

  }

  public render() {
    const newButton = this.props.loginState.isLoggedIn ? (
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
