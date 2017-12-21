/// <reference path="../redux-styles.d.ts" />
import * as React from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';
import googlecode from "react-syntax-highlighter/styles/hljs/googlecode";
let exampleText = `
void Main()
{
	var next5Friday13 = DateTime.Today
	.Recurse(a=>a.AddDays(1))
	.Where(a=>a.Day == 13 && a.DayOfWeek == DayOfWeek.Friday).Take(5);
	
}
public static class Extension
{
	public static IEnumerable<T> Recurse<T>(this T obj, Func<T,T> action)
	{
		var local = obj;
		while(true)
		{
		  local = action(local);
		  yield return local;
		}
	}
}
`

export class Tab1 extends React.Component<any, any>{
    render(){
        return(
            <Col sm="12">
                <Card style={{ paddingTop: "10px" }}>
                    <SyntaxHighlighter showLineNumbers={true} language='cs' style={googlecode} >{exampleText}</SyntaxHighlighter>
                </Card>
              </Col>);
    }
}