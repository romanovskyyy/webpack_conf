import React from 'react';

const ModalFooter = () => {
    return (
        <div className="modal-footer">
            <div className="forgot login-footer">
                <p>
                    Don’t have an Account?{' '}
                    <a href="javascript: showRegisterForm();" className="link">
                        Sign up
                    </a>
                </p>
            </div>
            <div className="forgot register-footer" style={{ display: 'none' }}>
                <span>Already have an account?</span>
                <a href="javascript: showLoginForm();"> Login</a>
            </div>
        </div>
    );
};

export default ModalFooter;
