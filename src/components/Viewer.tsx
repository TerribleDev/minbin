/// <reference path="../redux-styles.d.ts" />
import * as React from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';
import googlecode from "react-syntax-highlighter/styles/hljs/googlecode";
let exampleText = `
void Main()
{
	let next5Friday13 = DateTime.Today
	.Recurse(a=>a.AddDays(1))
	.Where(a=>a.Day == 13 && a.DayOfWeek == DayOfWeek.Friday).Take(5);
	
}
public static class Extension
{
	public static IEnumerable<T> Recurse<T>(this T obj, Func<T,T> action)
	{
		let local = obj;
		while(true)
		{
		  local = action(local);
		  yield return local;
		}
	}
}
`
export interface ViewerProps {doc?: string, language?: string} 
export class Viewer extends React.Component<ViewerProps, any>{
    render(){
        return(
                <Card style={{ paddingTop: "10px" }}>
                    <SyntaxHighlighter showLineNumbers={true} language={this.props.language || 'cs'} style={googlecode} >{this.props.doc || ''}</SyntaxHighlighter>
                </Card>);
    }
}