import { ListItem } from '../components/ListItem';
import { Viewer } from '../components/Viewer';
import { LoginState } from '../models/LoginState';
import * as React from 'react';
import fbData from '../startup/firebase';
import Progress from 'reactstrap/lib/Progress';
import { DocumentPlusKey } from '../models/Document'
import { getLanguage } from '../util/doc';

export class ListContainer extends React.Component<{login: LoginState}, {inProgress: Boolean, docs: Array<DocumentPlusKey>, error : Boolean }>{
    inProgress: Boolean = true;
    getPastes(){
        fbData.rebase.fetch(`/docs/${this.props.login.uid}`, 
        {
            context: this,
            asArray: true
        })
        .then((data: Array<DocumentPlusKey>)=>
        {
            this.setState({docs: data, inProgress: false});
        })
        .catch((err: any)=>{
            console.error(err);
            this.setState({error: true, inProgress: false});
        });
    }
    constructor(login: {login: LoginState}){
        super(login)
        this.state = {inProgress: true, docs: new Array<DocumentPlusKey>(), error: false}
    }
    componentDidMount(){
        this.getPastes()
    }
    render(){
        if(this.state.inProgress){
            return <div><Progress striped={true} animated={true} max={100}  value={100}   /></div>
        }
        if(this.state.error){
            return <h4>Oh No! An error occured</h4>
        }
        if(this.state.docs.length < 1){
            return <h4>No pastes found <small>Press new in the upper right to make a paste!</small></h4>
        }
        let elems =this.state.docs.map(doc => {
           return <ListItem key={`${doc.key}_li`} docId={doc.key} doc={doc} uid={this.props.login.uid}   />
        });
        return <div>{elems}</div>
        
    }
}