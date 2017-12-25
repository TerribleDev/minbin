import * as React from "react";

export class Conditional extends React.Component<{render:boolean}, any>{
    render(){
        let toRender = this.props.render? this.props.children : null;
        return <span>{toRender}</span>
    }
}