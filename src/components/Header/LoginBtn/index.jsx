import React from 'react';

const LoginBtn = ({ showModal }) => {
    return (
        <a className="btn btn-default navbar-btn" onClick={showModal}>
            <i className="icon-fontello icon-1" />
            <span>Log in </span>
        </a>
    );
};

export default LoginBtn;
