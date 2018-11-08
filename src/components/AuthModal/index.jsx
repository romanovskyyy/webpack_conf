import React, { Component } from 'react';
import './style.scss';

import Login from './Login';
import Register from './Register';
import Social from './Social';
import ModalFooter from './ModalFooter';
import Backdrop from '../UI/Backdrop';
import ForgotPass from './ForgotPass';
import ModalWrapper from '../UI/Modal';

import { connect } from 'react-redux';
import { getUserData, hideModalAction } from '../../ducks/auth';
import { escKeyDown } from '../../helpers/common';

class AuthModal extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }
    handleGetUserData = () => {
        const { step, dispatch } = this.props;
        if (step === 5) {
            dispatch(getUserData());
        }
    };

    componentDidUpdate = (prevProps) => {
        const { showModal } = this.props;
        if (prevProps.showModal !== showModal && showModal) {
            setTimeout(() => this.modalRef.current.focus(), 10);
        }
    };

    handleHideModal = () => {
        this.props.dispatch(hideModalAction());
    };
    render() {
        const { hideModal, socialLinks, step } = this.props;
        return (
            <div
                id="loginModal"
                tabIndex="-1"
                className={`modal`}
                role="dialog"
                onClick={this.handleGetUserData}
            >
                <Backdrop click={hideModal} />
                <div
                    className={`modal-dialog login`}
                    tabIndex="1"
                    ref={this.modalRef}
                    onKeyDown={(e) => escKeyDown(e, this.handleHideModal)}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={hideModal}>
                                &times;
                            </button>
                            <h4 className="auth-modal-title">Log In to your Account</h4>
                        </div>
                        <div className="modal-body">
                            <Login />
                            <Register step={step} />
                            <ForgotPass />
                            <div className="division">
                                <div className="line l" />
                                <span>or</span>
                                <div className="line r" />
                            </div>
                            <Social socialLinks={socialLinks} />
                        </div>
                        <ModalFooter />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    socialLinks: auth.socialLinks,
    step: auth.step,
    showModal: auth.showModal
});

export default connect(mapStateToProps)(AuthModal);
