import React from 'react';

import MaleRadio from '../../../UI/MaleRadio';
import ErrorDiv from '../../ErrorDiv';

import { Field } from 'redux-form';
import { required } from '../../../../helpers/validation';

const Male = ({ errorText, valid, submitFailed, prev, next }) => {
    return (
        <div id="step3" className="step-content-body">
            <div className="form">
                <Field name="gender" component={MaleRadio} validate={required} />
                {submitFailed && !valid && <ErrorDiv errorText={errorText} />}
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xs-6">
                            <input
                                className="btn btn-primary btn-block"
                                type="button"
                                value="Previous"
                                name="prev"
                                onClick={prev}
                            />
                        </div>
                        <div className="col-sm-6 col-xs-6">
                            <input
                                className="btn btn-primary btn-block"
                                type="button"
                                value="Next"
                                name="next"
                                onClick={() => next(['email', 'password', 'confirm'])}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Male;
