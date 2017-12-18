import * as React from "react";
import { Row, Col, Card, CardText } from "reactstrap";

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
        <Row>
            <Col sm="12">
                <Card style={{ paddingTop: "10px" }}>
                    <pre className='line-numbers'>
                        <code className="language-csharp">
                            {exampleText}
                        </code>
                    </pre>
                </Card>
              </Col>
        </Row>);
    }
}