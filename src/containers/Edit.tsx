import { ChangeEventHandler } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle, Col, FormText, Input, Nav, NavbarBrand, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { Conditional } from "../components/Conditional";
import { Editor } from "../components/Editor";
import { Viewer } from "../components/Viewer";
import { Document } from "../models/Document";
import { LoginState } from "../models/LoginState";
import { getDocument, saveDocument } from "../repositories/firebaseRepository";
import fbData from "../startup/firebase";
import { generateDocId, getLanguage } from "../util/doc";

export interface EditState {document: Document; hasEdits?: boolean; }
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
      getDocument(this.props.docId, this.props.uid)
      .then((document) => {
          this.setState({document});
      });
    }

  public updateDocument() {
      saveDocument(this.state.document, this.props.docId, this.props.login.uid)
        .then(() => {
            console.log("state set!");
            this.setState({hasEdits: false});
        });
  }
  public onTitleUpdate(title: string) {
    const doc = Object.apply({}, [{Title: title}, this.state.document]);
    this.setState({hasEdits: true, document: doc});
  }
  public onBodyUpdate(body: string) {
    const doc = Object.apply({}, [{Body: body}, this.state.document]);
    this.setState({hasEdits: true, document: doc});
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
                      <textarea className="form-control" style={{height: "40vh"}} value={this.state.document.Body || ""} onChange={(event) => this.onBodyUpdate(event.target.value)}></textarea>
                      </Col>
                    </Row>
                    <Row style={{height: "20vh"}} >
                      <Col sm="12">
                        <form style={{paddingLeft: "10px"}} className={"form-inline"}>
                            <label htmlFor="title-input">Title: &nbsp;</label>
                            <input placeholder={"KittensAttack.cpp"} style={{marginRight: "15px"}} type="text" onChange={(event) => this.onTitleUpdate(event.target.value)} value={this.state.document.Title} className="form-control" id="title-input" />
                            <Button name="Save" value="Save" color="primary" disabled={!this.state.hasEdits} >Save</Button>
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
