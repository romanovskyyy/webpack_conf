import React from 'react';
import './style.scss';

import { Element } from 'react-scroll';

const AddBusinessInp = ({ input, meta, placeholder, type, className = '' }) => (
    <div className={className}>
        <div className={`form-group ${meta.error && meta.touched && 'error'}`}>
            {input.name && <Element name={`position-${input.name}`} />}
            {type === 'textarea' ? (
                <textarea
                    className="form-control"
                    {...input}
                    autoComplete="new-password"
                    placeholder={placeholder}
                    title={placeholder}
                />
            ) : (
                <input
                    className="form-control"
                    {...input}
                    type={type}
                    autoComplete="new-password"
                    placeholder={placeholder}
                    title={placeholder}
                />
            )}

            {meta.error &&
                meta.touched && (
                    <span className="error">
                        {placeholder} {meta.error}
                    </span>
                )}
        </div>
    </div>
);

export default AddBusinessInp;
