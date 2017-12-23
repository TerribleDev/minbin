import { LoginState } from '../models/LoginState';
import { AppState } from '../models/AppState';
import * as React from 'react';
import * as _ from 'underscore';
import fbData from '../startup/firebase'
import {Document} from '../models/Document'
import { Col } from 'reactstrap';

interface EditProps {docId: string, login: LoginState}
interface EditState {document: Document}

export class Editor extends React.Component<EditProps, EditState>{
    constructor(props: EditProps){
        super(props)
        this.state = {
            document:{
                Title: '',
                Body: ''
            }
        };
    }
    ref: any
    componentDidMount() {
        if(!this.props.login.isLoggedIn){
            return;
        }
        let docId = '';
        if(this.props && this.props.docId && this.props.docId.length > 0){
            docId = this.props.docId;
        }
        else{
            docId = this.generateDocId()
        }
        this.ref = fbData.rebase.syncState(`docs/${this.props.login.uid}/${docId}`, {
          context: this,
          state: 'document',
          asArray: false
        });
      }
    
    componentWillUnmount() {
        fbData.rebase.removeBinding(this.ref);
    }
    generateDocId(){
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++){
            result += str.charAt(Math.floor(Math.random()*str.length))
        }
        return result;
    }
    updateDocument(docBody: string){
        this.setState({
            document: {
                Title: '',
                Body: docBody
            }
        })
    }

    render(){
        let textArea = null;
        if(this.props.login.isLoggedIn){
            textArea = <textarea className="form-control" style={{height: "70vh"}} value={this.state.document.Body} onChange={(event)=>this.updateDocument(event.target.value)}></textarea>
        }
        return(
        <Col sm="12">
            {textArea}
        </Col>
        );
    }

}