import React from 'react';

import AccRadio from '../../../UI/AccRadio';
import ErrorDiv from '../../ErrorDiv';

import { Field } from 'redux-form';
import { required } from '../../../../helpers/validation';

const AccountType = ({ errorText, valid, submitFailed }) => {
    return (
        <div id="step4" className="step-content-body">
            <div className="form">
                <Field name="private" component={AccRadio} validate={required} />
                {submitFailed && !valid && <ErrorDiv errorText={errorText} />}
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            <button
                                className="btn btn-primary pull-right btn-block active"
                                type="submit"
                            >
                                Create an account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountType;
