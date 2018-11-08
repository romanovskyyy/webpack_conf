import React from 'react';

import EditUserInput from '../../../components/UI/EditUserInput';

import { Field, reduxForm, Form } from 'redux-form';
import { updatePassword } from '../../../ducks/editUser';
import { password, newPasswordMatch, minValue8, required } from '../../../helpers/validation';
import { specialCharacters } from '../../../helpers/normalize';
import { scrollToFirstError } from '../../../helpers/scrollToError';

const Password = ({ handleSubmit, dispatch, submitFailed, valid, error, isSocial }) => {
    return (
        <div className="dashboardBoxBg mt30">
            <div className="profileIntro">
                <h3>Update password</h3>
                <div className="row">
                    <Form onSubmit={handleSubmit((val) => dispatch(updatePassword(val)))}>
                        {!isSocial && (
                            <Field
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                component={EditUserInput}
                                placeholder="Current Password"
                                validate={[required, minValue8, password]}
                                normalize={(val) => specialCharacters(val)}
                            />
                        )}

                        <Field
                            name="newPassword"
                            label="New Password"
                            type="password"
                            component={EditUserInput}
                            placeholder="New Password"
                            validate={[required, minValue8, password]}
                            normalize={(val) => specialCharacters(val)}
                        />
                        <Field
                            name="confirm"
                            label="Confirm Password"
                            type="password"
                            component={EditUserInput}
                            placeholder="Confirm Password"
                            validate={[required, minValue8, password, newPasswordMatch]}
                            normalize={(val) => specialCharacters(val)}
                        />
                        {submitFailed &&
                            !valid &&
                            error && (
                                <div className="form-group col-xs-12 error">
                                    <span>{error}</span>
                                </div>
                            )}

                        <div className="form-group col-xs-12">
                            <button className="btn btn-primary" type="submit">
                                Change Password
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'editPassword',
    onSubmitFail: (errors) => scrollToFirstError(errors)
})(Password);
