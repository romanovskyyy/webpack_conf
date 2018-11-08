import React from 'react';
import { Element } from 'react-scroll';

const EditUserInput = ({ input, meta, placeholder, label, type, className = '' }) => (
    <div className={`form-group col-xs-12 ${className} ${meta.error && meta.touched && 'error'}`}>
        {input.name && <Element name={`position-${input.name}`} />}
        <label>{label}</label>
        {type === 'textarea' ? (
            <textarea {...input} placeholder={placeholder} type={type} className="form-control" />
        ) : (
            <input
                className="form-control"
                {...input}
                type={type}
                autoComplete="new-password"
                placeholder={placeholder}
            />
        )}
        {meta.error &&
            meta.touched && (
                <span className="error">
                    {label} {meta.error}
                </span>
            )}
    </div>
);

export default EditUserInput;
