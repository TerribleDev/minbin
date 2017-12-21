import { LoginState } from '../models/LoginState';
import { Edit } from '../containers/Edit';
import { Tab1 } from './Tab1';
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand } from 'reactstrap';

export interface TabSelected {tabNumber: string}
export interface TabNavProps {login: LoginState}

export class TabNav extends React.Component<TabNavProps, TabSelected> {
  constructor(props: TabNavProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tabNumber: "1"
    };
  }

  toggle(tab: string) {
    if (this.state.tabNumber !== tab) {
        super.setState({
        tabNumber: tab
      });
    }
  }
  render() {
    var editor = this.props.login.isLoggedIn ?  <Edit docId={"awesome"} login={this.props.login} /> : <h4> Please login, yo</h4>
    return (
      <div>
        <Nav tabs className="ml-auto">
          <NavItem>
            <NavLink
              className={this.state.tabNumber === '1' ? 'active': ''}
              onClick={() => { this.toggle('1'); }}
            >
              View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.tabNumber === '2' ? 'active': ''}
              onClick={() => { this.toggle('2'); }}
            >
              Edit
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.tabNumber}>
          <TabPane tabId="1">
            <Row style={{height: '100%'}}>
                <Tab1 />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{height: '100%'}}>
              <Col sm="12">
                {editor}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
