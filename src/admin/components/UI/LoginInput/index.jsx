import React from 'react';
import './style.scss';

const LoginInput = ({ placeholder, type, meta, input }) => (
    <div className={`admin-input-wrapper ${meta.error && meta.touched && 'error'}`}>
        <input type={type} {...input} placeholder={placeholder} />
        {meta.error && meta.touched && <span className="error">{meta.error}</span>}
    </div>
);

export default LoginInput;
