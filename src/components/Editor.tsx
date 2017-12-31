import * as React from "react";
import { Col } from "reactstrap";
import * as _ from "underscore";
import { AppState } from "../models/AppState";
import {Document} from "../models/Document";
import { LoginState } from "../models/LoginState";
import fbData from "../startup/firebase";

interface EditProps {documentBody: string; onChange?: (doc: string) => void; }

export class Editor extends React.Component<EditProps, {}> {
    public updateDocument(docBody: string) {
        if (this.props.onChange) { this.props.onChange(docBody); }
    }
    public render() {
        return(
        <Col sm="12">
            <textarea className="form-control" style={{height: "70vh"}} value={this.props.documentBody || ""} onChange={(event) => this.updateDocument(event.target.value)}></textarea>
        </Col>
        );
    }

}
