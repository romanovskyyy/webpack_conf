import React from 'react';
import AuthInput from '../../UI/AuthInput/';
import ErrorDiv from '../ErrorDiv';

import { connect } from 'react-redux';
import { Field, reduxForm, Form, getFormSyncErrors } from 'redux-form';
import { login } from '../../../ducks/auth';
import { required } from '../../../helpers/validation';
import { renderError } from '../../../helpers/errors';

const Login = ({ handleSubmit, dispatch, error, submitFailed, formSyncErrors, valid }) => {
    return (
        <div className="box">
            <div className="content">
                <div className="error" />
                <div className="form loginBox">
                    <Form
                        className="loginForm"
                        acceptCharset="UTF-8"
                        onSubmit={handleSubmit((value) => dispatch(login(value)))}
                    >
                        <Field
                            id="email"
                            name="email"
                            icon="fa-envelope"
                            type="email"
                            component={AuthInput}
                            placeholder="Email"
                            validate={required}
                            normalize={(val) => val.slice(0, 1000)}
                        />
                        <Field
                            id="pwd"
                            name="password"
                            icon="fa-lock"
                            placeholder="Password"
                            type="password"
                            component={AuthInput}
                            validate={required}
                            normalize={(val) => val.slice(0, 1000)}
                        />
                        {submitFailed &&
                            !valid && (
                                <ErrorDiv
                                    submitError={error}
                                    errorText={() => renderError(formSyncErrors)}
                                />
                            )}
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Log In
                            </button>
                        </div>
                        <div className="checkbox">
                            <label htmlFor="remember">
                                <Field
                                    name="remember"
                                    id="remember"
                                    component="input"
                                    type="checkbox"
                                />
                                Remember me
                            </label>
                            <a
                                href="javascript: showForgetPasswordForm();"
                                className="pull-right link"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    formSyncErrors: getFormSyncErrors('login')(state)
});
export default connect(mapStateToProps)(
    reduxForm({
        form: 'login',
        touchOnChange: false,
        touchOnBlur: false
    })(Login)
);
