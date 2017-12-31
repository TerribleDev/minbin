import * as React from "react";

export class Conditional extends React.Component<{render: boolean}, any> {
    public render() {
        const toRender = this.props.render ? this.props.children : null;
        return <span>{toRender}</span>;
    }
}
