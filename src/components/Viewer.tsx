/// <reference path="../react-syntax-highlighter.d.ts" />
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import googlecode from "react-syntax-highlighter/styles/hljs/googlecode";
import { Card, CardText, Col, Row } from "reactstrap";

export interface ViewerProps {doc?: string; language?: string; maxHeight?: string; }
export class Viewer extends React.Component<ViewerProps, any> {
    public render() {
		const style: React.CSSProperties = { paddingTop: "10px" };
		if (this.props.maxHeight) {
			style.maxHeight = this.props.maxHeight;
		}
  return(

                <Card style={style}>
                    <SyntaxHighlighter showLineNumbers={true} language={this.props.language || null} style={googlecode} >{this.props.doc || ""}</SyntaxHighlighter>
				</Card>
			);
    }
}
