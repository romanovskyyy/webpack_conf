import React from 'react';
import './style.scss';

const AccRadio = (field) => {
    return (
        <div className="form-group">
            <ul className="custom-options gender">
                <li>
                    <input
                        {...field.input}
                        type="radio"
                        name="public"
                        value="false"
                        id="public"
                        checked={field.input.value === 'false'}
                    />
                    <label htmlFor="public">
                        <span className="radio-icon">
                            <span className="demo-icon icon-public" />
                        </span>
                        <span className="radio-content">Public Account</span>
                    </label>
                </li>
                <li>
                    <input
                        {...field.input}
                        type="radio"
                        name="private"
                        value="true"
                        id="private"
                        checked={field.input.value === 'true'}
                    />
                    <label htmlFor="private">
                        <span className="radio-icon">
                            <span className="demo-icon icon-private" />
                        </span>
                        <span className="radio-content">Private Account</span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default AccRadio;
