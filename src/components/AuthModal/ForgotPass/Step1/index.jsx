import React from 'react';

import { Field } from 'redux-form';
import ErrorDiv from '../../ErrorDiv/';
import AuthInput from '../../../../components/UI/AuthInput';
import { renderError } from '../../../../helpers/errors';

const Step1 = ({ submitFailed, valid, formSubmitErrors, submitError }) => {
    return (
        <div className="form">
            <p>Enter your email address and we'll help you reset your password</p>
            <Field
                name="email"
                icon="fa-envelope"
                type="email"
                component={AuthInput}
                placeholder="Email"
                normalize={(val) => val.slice(0, 1000)}
            />
            {submitFailed &&
                !valid && (
                    <ErrorDiv
                        submitError={submitError}
                        errorText={() => renderError(formSubmitErrors)}
                    />
                )}
            <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit" name="next">
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default Step1;
