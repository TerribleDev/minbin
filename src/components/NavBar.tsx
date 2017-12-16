import * as React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand, Navbar } from 'reactstrap';

export class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">minbin</NavbarBrand>
        <Nav navbar className="ml-auto">
          <NavItem>
              {this.props.children}
          </NavItem>
        </Nav>
        </Navbar>
      </div>
    );
  }
}
