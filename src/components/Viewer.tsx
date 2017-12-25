/// <reference path="../react-syntax-highlighter.d.ts" />
import * as React from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';
import googlecode from "react-syntax-highlighter/styles/hljs/googlecode";

export interface ViewerProps {doc?: string, language?: string, maxHeight?: string} 
export class Viewer extends React.Component<ViewerProps, any>{
    render(){
		let style : React.CSSProperties = { paddingTop: "10px" };
		if(this.props.maxHeight){
			style.maxHeight = this.props.maxHeight
		}
        return(
				
                <Card style={style}>
                    <SyntaxHighlighter showLineNumbers={true} language={this.props.language || null} style={googlecode} >{this.props.doc || ''}</SyntaxHighlighter>
				</Card>
			);
    }
}