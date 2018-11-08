import React, { Component } from 'react';
import './style.scss';

import Backdrop from '../Backdrop';
import { escKeyDown } from '../../../helpers/common';

class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }
    componentDidUpdate = (prevProps) => {
        const { show } = this.props;
        if (prevProps.show !== show && show) {
            setTimeout(() => this.modalRef.current.focus(), 10);
        }
    };

    render() {
        const { children, className, click } = this.props;
        return (
            <div
                className={`modal-wrapper ${className}`}
                onKeyDown={(e) => escKeyDown(e, click)}
                tabIndex="1"
                ref={this.modalRef}
            >
                <Backdrop click={click} />
                {children}
            </div>
        );
    }
}

export default ModalWrapper;
