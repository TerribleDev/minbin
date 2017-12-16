import * as React from "react";
require('../styles/main.css');
export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
    return (
        <div className="main">
            <p>Hello from {this.props.compiler} and {this.props.framework}!</p>
        </div>
    );
        
    }
}