import { generateDocId } from '../util/doc';
import { LoginState } from '../models/LoginState';
import { Editor } from '../components/Editor';
import { Viewer } from '../components/Viewer';
import * as React from 'react';
import fbData from '../startup/firebase'
import {Document} from '../models/Document'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

export interface EditState {document: Document}
export interface EditProps {login: LoginState, docId: string, uid: string, showEdit? : Boolean}

export class Edit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);

    this.state = {
      document: {
        Title: '',
        Body: ''
      }
    };
  }
  ref: any
  componentDidMount() {
      this.ref = fbData.rebase.syncState(`docs/${this.props.uid}/${this.props.docId}`, {
        context: this,
        state: 'document',
        asArray: false
      });
    }
  
  componentWillUnmount() {
      fbData.rebase.removeBinding(this.ref);
  }
  updateTitle(docTitle: string){
    this.setState({document:{Title: docTitle}});
  }
  updateDocument(docBody: string){
      this.setState({
          document: {
              Body: docBody
          }
      });
  }

  render() {
    var tabNumber = this.props.showEdit ? '2': '1'
    var editlawl = (this.props.login.isLoggedIn && this.props.login.uid === this.props.uid ) ?  <Editor documentBody={this.state.document.Body} onChange={(doc:string)=>this.updateDocument(doc)} /> : <h4> Please signin as the owener to edit</h4>
    var viewer = tabNumber === '1'? <Viewer doc={this.state.document.Body} /> : null;
    return (
      <div>
        <Nav tabs className="ml-auto">
          <NavItem>
            <Link
              to="view"
              className={`nav-link ${tabNumber === '1' ? 'active': ''}`}
            >
              View
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="edit"
              className={`nav-link ${tabNumber === '2' ? 'active': ''}`}
            >
              Edit
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={tabNumber}>
          <TabPane tabId="1">
            <Row style={{height: '100%'}}>
              <Col sm="12">
                <br />
                <h4>{this.state.document.Title}</h4><br />
                {viewer}
              </Col >
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{height: '100%'}}>
              <Col sm="12">
                {editlawl}
                <form className={'form-inline'}>
                  <label htmlFor="title-input">Title: &nbsp;</label>
                  <input type="text" onChange={(event)=>this.updateTitle(event.target.value)} value={this.state.document.Title} className="form-control" id="title-input" placeholder="Title" />
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        
      </div>
    );
  }
}
