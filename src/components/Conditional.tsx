import * as React from "react";

export class Conditional extends React.Component<{render:boolean}, any>{
    render(){
        var toRender = this.props.render? this.props.children : null;
        return <span>{toRender}</span>
    }
}