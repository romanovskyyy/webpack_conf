import React from 'react';

const LoginInput = ({ meta, icon, input, placeholder, type, dataProvide }) => {
    return (
        <div className={`form-group ${meta.error && meta.touched && 'error'}`}>
            <i className={`fa ${icon}`} aria-hidden="true" />
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                className="form-control"
                data-provide={dataProvide}
            />
        </div>
    );
};

export default LoginInput;
