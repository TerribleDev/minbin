import { IsLoggedIn } from '../containers/IsLoggedIn';
import { Edit } from '../containers/Edit';
import { Tab1 } from './Tab1';
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand } from 'reactstrap';

export class TabNav extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
        super.setState({
        activeTab: tab
      });
    }
  }
  render() {
    let plzLogin = <h4> Please login, yo</h4>
    let editor = <Edit docId={"awesome"} />
    return (
      <div>
        <Nav tabs className="ml-auto">
          <NavItem>
            <NavLink
              className={this.state.activeTab === '1' ? 'active': ''}
              onClick={() => { this.toggle('1'); }}
            >
              View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active': ''}
              onClick={() => { this.toggle('2'); }}
            >
              Edit
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row >
              <Tab1 />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <IsLoggedIn isTrue={editor} isFalse={plzLogin} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
