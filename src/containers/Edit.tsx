import { ChangeEventHandler } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle, Col, FormText, Input, Nav, NavbarBrand, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { Conditional } from "../components/Conditional";
import { Editor } from "../components/Editor";
import { Viewer } from "../components/Viewer";
import {Document} from "../models/Document";
import { LoginState } from "../models/LoginState";
import fbData from "../startup/firebase";
import { generateDocId, getLanguage } from "../util/doc";

export interface EditState {document: Document; }
export interface EditProps {login: LoginState; docId: string; uid: string; showEdit?: boolean; }

export class Edit extends React.Component<EditProps, EditState> {
  public ref: any;
  constructor(props: EditProps) {
    super(props);

    this.state = {
      document: {
        Title: "",
        Body: "",
      },
    };
  }

  public componentDidMount() {
      this.ref = fbData.rebase.syncState(`docs/${this.props.uid}/${this.props.docId}`, {
        context: this,
        state: "document",
        asArray: false,
      });
    }

  public componentWillUnmount() {
      fbData.rebase.removeBinding(this.ref);
  }
  public updateTitle(docTitle: string) {
    this.setState({document: {Title: docTitle}});
  }
  public updateDocument(docBody: string) {
      this.setState({
          document: {
              Body: docBody,
          },
      });
  }

  public render() {
    const tabNumber = this.props.showEdit ? "2" : "1";
    const displayEdit = this.props.login.isLoggedIn && this.props.login.uid === this.props.uid;
    const displayViewer = tabNumber === "1";

     // : null;
    return (
      <div>
        <Nav tabs className="">
          <NavItem>
            <Link
              to="view"
              className={`nav-link ${tabNumber === "1" ? "active" : ""}`}
            >
              View
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="edit"
              className={`nav-link ${tabNumber === "2" ? "active" : ""}`}
            >
              Edit
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={tabNumber}>
          <TabPane tabId="1">
            <Row style={{height: "100vh"}}>
              <Col sm="12">
                <Conditional render={displayViewer}>
                  <br />
                  <h4>{this.state.document.Title}</h4><br />
                  <Viewer doc={this.state.document.Body} language={getLanguage(this.state.document.Title)} />
                </Conditional>
              </Col >
            </Row>
          </TabPane>
          <TabPane tabId="2">
                <Conditional render={displayEdit}>
                    <Row style={{height: "60vh"}}>
                      <Col sm="12" style={{height: "100%"}}>
                      <div>Permalink: <Input readOnly type="text" value={`https://minbin.co/d/${this.props.login.uid}/${this.props.docId}`} /></div><br />
                      <textarea className="form-control" style={{height: "40vh"}} value={this.state.document.Body || ""} onChange={(event) => this.updateDocument(event.target.value)}></textarea>
                      </Col>
                    </Row>
                    <Row style={{height: "20vh"}} >
                      <Col sm="12">
                        <form style={{paddingLeft: "10px"}} className={"form-inline"}>
                            <label htmlFor="title-input">Title: &nbsp;</label>
                            <input placeholder={"KittensAttack.cpp"} type="text" onChange={(event) => this.updateTitle(event.target.value)} value={this.state.document.Title} className="form-control" id="title-input" />
                        </form>
                      </Col>
                    </Row>

                </Conditional>

                <Conditional render={!displayEdit}>
                  <Row>
                    <Col sm={{offset: 2, size: 10}} >
                      <h4> Please signin as the owner to edit</h4>
                    </Col>
                  </Row>
                </Conditional>
          </TabPane>
        </TabContent>

      </div>
    );
  }
}
