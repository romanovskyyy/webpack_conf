import React from 'react';

const CommonInp = ({ meta, input, placeholder, type, htmlFor, label = '', id, customClass }) => {
    return (
        <div
            className={`form-group col-xs-12 ${customClass} ${meta.error &&
                meta.touched &&
                'error'}`}
        >
            {label && <label htmlFor={htmlFor}>{label}</label>}
            {type === 'text' || type === 'password' ? (
                <input
                    {...input}
                    placeholder={placeholder}
                    id={id}
                    type={type}
                    className="form-control"
                    autoComplete="new-password"
                />
            ) : (
                <textarea
                    {...input}
                    placeholder={placeholder}
                    id={id}
                    type={type}
                    className="form-control"
                />
            )}
        </div>
    );
};

export default CommonInp;
