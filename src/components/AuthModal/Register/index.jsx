import React, { Component } from 'react';
import './style.scss';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import FinalStep from './FinalStep';

import { renderError } from '../../../helpers/errors';
import { asyncValidate, defaultShouldAsyncValidate } from '../../../helpers/validation';
import { handleRenderStepsIndicator } from '../../../helpers/arrRender';

import {
    reduxForm,
    Form,
    getFormSyncErrors,
    setSubmitFailed,
    setSubmitSucceeded,
    getFormAsyncErrors
} from 'redux-form';
import { connect } from 'react-redux';
import { register, nextStepAction, prevStepAction } from '../../../ducks/auth';

class Register extends Component {
    handleNextStep = (fields) => {
        const { dispatch, valid } = this.props;
        if (valid) {
            dispatch(nextStepAction());
            dispatch(setSubmitSucceeded('register'));
        } else {
            dispatch(setSubmitFailed('register', ...fields));
        }
    };

    startAsyncValidate = () => {
        this.props.asyncValidate();
    };

    handlePrevStep = () => {
        const { dispatch } = this.props;
        dispatch(prevStepAction());
    };

    handleStepRender = () => {
        const { step, formSyncErrors = {}, valid, submitFailed, formAsyncErrors = {} } = this.props;
        const uniteErrors = {
            ...formSyncErrors,
            ...formAsyncErrors
        };
        switch (step) {
            case 1:
                return (
                    <Step1
                        next={this.handleNextStep}
                        valid={valid}
                        submitFailed={submitFailed}
                        errorText={() => renderError(uniteErrors)}
                    />
                );
            case 2:
                return (
                    <Step2
                        next={this.handleNextStep}
                        prev={this.handlePrevStep}
                        valid={valid}
                        startAsyncValidate={this.startAsyncValidate}
                        submitFailed={submitFailed}
                        formAsyncErrors={formAsyncErrors}
                        errorText={() => renderError(uniteErrors)}
                    />
                );
            case 3:
                return (
                    <Step3
                        valid={valid}
                        next={this.handleNextStep}
                        prev={this.handlePrevStep}
                        submitFailed={submitFailed}
                        errorText={() => renderError(uniteErrors)}
                    />
                );
            case 4:
                return (
                    <Step4
                        valid={valid}
                        submitFailed={submitFailed}
                        errorText={() => renderError(uniteErrors)}
                    />
                );
            case 5:
                return <FinalStep />;
            default:
                return <Step1 />;
        }
    };

    render() {
        const { handleSubmit, dispatch, step } = this.props;
        return (
            <div className="box">
                <div className="content registerBox" style={{ display: 'none' }}>
                    <Form
                        className="loginForm"
                        html="{:multipart=>true}"
                        data-remote="true"
                        acceptCharset="UTF-8"
                        onSubmit={handleSubmit((val) => dispatch(register(val)))}
                        autoComplete="off"
                    >
                        <div className="card step-progress">
                            <div className="step-content">{this.handleStepRender()}</div>
                            <div className="step-slider">{handleRenderStepsIndicator(step)}</div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    formSyncErrors: getFormSyncErrors('register')(state),
    formAsyncErrors: getFormAsyncErrors('register')(state)
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'register',
        touchOnChange: false,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        touchOnBlur: false,
        shouldAsyncValidate: (params) =>
            defaultShouldAsyncValidate({ ...params, syncValidationPasses: true }),
        asyncValidate,
        asyncChangeFields: ['email', 'name']
    })(Register)
);
