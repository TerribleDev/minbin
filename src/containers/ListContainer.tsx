import * as React from "react";
import Progress from "reactstrap/lib/Progress";
import { ListItem } from "../components/ListItem";
import { Viewer } from "../components/Viewer";
import { DocumentPlusKey } from "../models/Document";
import { LoginState } from "../models/LoginState";
import fbData from "../startup/firebase";
import { getLanguage } from "../util/doc";

export class ListContainer extends React.Component<{login: LoginState}, {inProgress: boolean, docs: DocumentPlusKey[], error: boolean }> {
    public inProgress: boolean = true;
    constructor(login: {login: LoginState}) {
        super(login);
        this.state = {inProgress: true, docs: new Array<DocumentPlusKey>(), error: false};
    }
    public getPastes() {
        fbData.rebase.fetch(`/docs/${this.props.login.uid}`,
        {
            context: this,
            asArray: true,
        })
        .then((data: DocumentPlusKey[]) => {
            this.setState({docs: data, inProgress: false});
        })
        .catch((err: any) => {
            console.error(err);
            this.setState({error: true, inProgress: false});
        });
    }
    public componentDidMount() {
        this.getPastes();
    }
    public render() {
        if (this.state.inProgress) {
            return <div><Progress striped={true} animated={true} max={100}  value={100}   /></div>;
        }
        if (this.state.error) {
            return <h4>Oh No! An error occured</h4>;
        }
        if (this.state.docs.length < 1) {
            return <h4>No pastes found <small>Press new in the upper right to make a paste!</small></h4>;
        }
        const elems = this.state.docs.map((doc) => {
           return <ListItem key={`${doc.key}_li`} docId={doc.key} doc={doc} uid={this.props.login.uid}   />;
        });
        return <div>{elems}</div>;

    }
}
