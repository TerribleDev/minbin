import { AppState } from '../models/AppState';
import * as React from 'react';
import * as _ from 'underscore';
import fbData from '../startup/firebase'
import {Document} from '../models/Document'
import { Col } from 'reactstrap';
import { connect } from 'react-redux';

interface PassedInProps {docId: string}
interface ReduxProps {appState: AppState}
interface EditProps extends PassedInProps, ReduxProps{}
interface EditState {document: Document}

const mapStateToProps = (state : AppState, ownProps : PassedInProps) : EditProps  =>
{
    return {appState: state, docId: ownProps.docId};
}
export class edit extends React.Component<EditProps, EditState>{
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
        if(!this.props.appState.login.isLoggedIn){
            return;
        }
        let docId = '';
        if(this.props && this.props.docId && this.props.docId.length > 0){
            docId = this.props.docId;
        }
        else{
            docId = this.generateDocId()
        }
        this.ref = fbData.rebase.syncState(`docs/${this.props.appState.login.uid}/${docId}`, {
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
        if(this.props.appState.login.isLoggedIn){
            textArea = <textarea value={this.state.document.Body} onChange={(event)=>this.updateDocument(event.target.value)}></textarea>
        }
        return(
        <Col sm="12">
            {textArea}
        </Col>
        );
    }

}

export const Edit = connect(mapStateToProps)(edit)