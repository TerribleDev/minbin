import { LoginState } from '../models/LoginState';
import { AppState } from '../models/AppState';
import * as React from 'react';
import * as _ from 'underscore';
import fbData from '../startup/firebase'
import {Document} from '../models/Document'
import { Col } from 'reactstrap';

interface EditProps {documentBody: string, onChange?: (doc:string)=>void}

export class Editor extends React.Component<EditProps, {}>{
    updateDocument(docBody: string){
        if(this.props.onChange) this.props.onChange(docBody);
    }
    render(){
        return(
        <Col sm="12">
            <textarea className="form-control" style={{height: "70vh"}} value={this.props.documentBody || ""} onChange={(event)=>this.updateDocument(event.target.value)}></textarea>
        </Col>
        );
    }

}