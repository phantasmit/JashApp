import React, { PureComponent, Component } from "react";

const HOCComponent = WrappedComponent => {
    
    class Wrapped extends PureComponent {
        render() {
            const { children, ...props } = this.props;
            return (
                <>
                    <WrappedComponent {...props} style={{ flex: 1 }}>
                        {children}
                    </WrappedComponent>
                </>
            )
        }
    }
    return Wrapped;
};

export default HOCComponent;