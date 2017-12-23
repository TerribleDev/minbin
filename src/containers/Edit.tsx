import { LoginState } from '../models/LoginState';
import { Editor } from '../components/Editor';
import { Viewer } from '../components/Viewer';
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand } from 'reactstrap';

export interface EditState {tabNumber: string, doc?: string}
export interface EditProps {login: LoginState, docId?: string}

export class Edit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
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
    var editlawl = this.props.login.isLoggedIn ?  <Editor docId={this.props.docId} login={this.props.login} onChange={(doc:string)=>{this.setState({doc: doc}) }} /> : <h4> Please login, yo</h4>
    var viewer = this.state.tabNumber === '1'? <Viewer doc={this.state.doc} /> : null;
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
                {viewer}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{height: '100%'}}>
              <Col sm="12">
                {editlawl}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
