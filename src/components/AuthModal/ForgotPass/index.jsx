import React from 'react';
import AuthInput from '../../UI/AuthInput';
import ErrorDiv from '../ErrorDiv';
import Step1 from './Step1';
import Step2 from './Step2';

import { Form, reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { forgotPassword } from '../../../ducks/auth';
import { renderError } from '../../../helpers/errors';
import { connect } from 'react-redux';

const ForgotPass = ({
    handleSubmit,
    dispatch,
    submitFailed,
    valid,
    formSubmitErrors,
    step,
    error
}) => {
    const handleStepRender = () => {
        switch (step) {
            default:
            case 1:
                return (
                    <Step1
                        submitFailed={submitFailed}
                        formSubmitErrors={formSubmitErrors}
                        submitError={error}
                        valid={valid}
                    />
                );
            case 2:
                return <Step2 />;
        }
    };
    return (
        <div className="box">
            <div className="content forgetPasswordBox" style={{ display: 'none' }}>
                <Form
                    className="loginForm"
                    html="{:multipart=>true}"
                    data-remote="true"
                    acceptCharset="UTF-8"
                    onSubmit={handleSubmit((val) => dispatch(forgotPassword(val)))}
                >
                    {handleStepRender()}
                </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    formSubmitErrors: getFormSubmitErrors('forgotPass')(state),
    step: state.auth.forgotPassStep
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'forgotPass',
        touchOnChange: true
    })(ForgotPass)
);
