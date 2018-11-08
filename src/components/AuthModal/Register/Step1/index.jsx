import React from 'react';
import AuthInput from '../../../UI/AuthInput';
import DatePicker from '../../../UI/DatePicker';
import ErrorDiv from '../../ErrorDiv';

import { Field } from 'redux-form';
import { required } from '../../../../helpers/validation';
import { phone, noWhiteSpace } from '../../../../helpers/normalize';

const index = ({ next, valid, submitFailed, errorText }) => {
    return (
        <div id="step1" className="step-content-body">
            <div className="form">
                <Field
                    name="name"
                    icon="fa-user"
                    type="text"
                    component={AuthInput}
                    placeholder="User Name"
                    validate={required}
                    normalize={(val) => noWhiteSpace(val)}
                />
                <Field
                    name="birth"
                    icon="fa-calendar"
                    type="text"
                    component={DatePicker}
                    validate={required}
                    placeholder="Date of Birth"
                />
                <Field
                    name="phone"
                    icon="fa-phone"
                    type="phone"
                    component={AuthInput}
                    placeholder="Phone Number"
                    normalize={(val) => phone(val)}
                    validate={required}
                />
                {submitFailed && !valid && <ErrorDiv errorText={errorText} />}
                <div className="form-group">
                    <input
                        className="btn btn-primary btn-block"
                        type="button"
                        value="Next"
                        name="next"
                        onClick={() => next(['name', 'birth', 'phone'])}
                    />
                </div>
            </div>
        </div>
    );
};

export default index;
