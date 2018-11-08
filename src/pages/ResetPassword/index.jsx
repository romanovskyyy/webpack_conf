import React, { Component } from 'react';

import CommonInp from '../../components/UI/CommonInp';
import ErrorDiv from '../../components/AuthModal/ErrorDiv';

import { reduxForm, Field, Form, getFormSyncErrors } from 'redux-form';
import { required, password, passwordsMatch, minValue8 } from '../../helpers/validation';
import { specialCharacters } from '../../helpers/normalize';
import { renderError } from '../../helpers/errors';
import { connect } from 'react-redux';
import { changePassword } from '../../ducks/auth';

class ResetPass extends Component {
    render() {
        const {
            handleSubmit,
            submitFailed,
            valid,
            formSyncErrors,
            dispatch,
            error,
            match: {
                params: { token }
            }
        } = this.props;

        return (
            <section className="clearfix worksArea" id="tab-section">
                <div className="container">
                    <div className="dashboardBoxBg mt30">
                        <div className="profileIntro">
                            <Form
                                onSubmit={handleSubmit((val) =>
                                    dispatch(changePassword(val, token))
                                )}
                            >
                                <h3>Reset password</h3>
                                <div className="row">
                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        placeholder="New Password"
                                        component={CommonInp}
                                        name="password"
                                        htmlFor="newPassword"
                                        label="New Password"
                                        validate={[required, password, minValue8]}
                                        normalize={(val) => specialCharacters(val)}
                                    />

                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        component={CommonInp}
                                        name="confirm"
                                        label="Confirm Password"
                                        htmlFor="confirmPassword"
                                        validate={[required, password, minValue8, passwordsMatch]}
                                        normalize={(val) => specialCharacters(val)}
                                    />
                                    {submitFailed &&
                                        !valid && (
                                            <div className="form-group col-xs-12">
                                                <ErrorDiv
                                                    errorText={() => renderError(formSyncErrors)}
                                                    submitError={error}
                                                />
                                            </div>
                                        )}
                                    <div className="form-group col-xs-12">
                                        <button className="btn btn-primary" type="submit">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state) => ({
    formSyncErrors: getFormSyncErrors('resetPassword')(state)
});

export default connect(mapStateToProps)(
    reduxForm({ form: 'resetPassword', touchOnChange: false, touchOnBlur: false })(ResetPass)
);
