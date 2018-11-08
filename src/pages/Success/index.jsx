import React, { Component } from 'react';
import './style.scss';

class Success extends Component {
    handleRenderText = () => {
        const { type } = this.props.match.params;
        switch (type) {
            case 'fail':
                return (
                    <React.Fragment>
                        <h4>Failed !</h4>
                        <br />
                        <h6>Something went wrong</h6>
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        <h4>Success !</h4>
                        <br />
                        <h6>You can login via your email</h6>
                    </React.Fragment>
                );
        }
    };
    render() {
        return <div className="verification_page">{this.handleRenderText()}</div>;
    }
}

export default Success;
