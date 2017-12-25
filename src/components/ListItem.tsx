import { Viewer } from './Viewer';
import { getLanguage } from '../util/doc';
import * as React from 'react';
import {Document} from "../models/Document"
import { Link } from "react-router-dom";
export class ListItem extends React.PureComponent<{doc: Document, uid: string, docId: string}>{
    render(){
        return <div key={`li_div_${this.props.docId}`}>
        <h4>
            <Link to={`/d/${this.props.uid}/${this.props.docId}/edit`}>{this.props.doc.Title || 'Untitled'}</Link>
        </h4>
        <Viewer  doc={this.props.doc.Body} language={getLanguage(this.props.doc.Title)} maxHeight={"200px"} /> 
    </div>
    }
}