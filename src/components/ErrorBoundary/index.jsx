import React, { Component } from 'react';
import './style.scss';

export default class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo: null
    };

    componentDidCatch = (error, errorInfo) => {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // You can also log error messages to an error reporting service here
    };

    componentWillUnmount = () => {
        this.setState({ error: null, errorInfo: null });
    };

    render() {
        const { error, errorInfo } = this.state;
        if (errorInfo) {
            // Error path
            return (
                <div className="error-boundary">
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
