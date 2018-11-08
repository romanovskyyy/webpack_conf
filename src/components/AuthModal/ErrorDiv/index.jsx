import React from 'react';
import './style.scss';

const ErrorDiv = ({ submitError, errorText, className = '' }) => {
    return (
        <div className={`error_wrapper ${className}`}>
            <ul>
                {errorText()}
                {submitError && <li>{submitError}</li>}
            </ul>
        </div>
    );
};

export default ErrorDiv;
