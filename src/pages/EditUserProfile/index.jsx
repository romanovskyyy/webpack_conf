import React, { Component } from 'react';

import Avatar from './Avatar';
import AboutYou from './AboutYou';
import Password from './Password';
import Radio from './Radio';
import diff from 'object-diff';

import { reduxForm, Form, Field, formValueSelector } from 'redux-form';
import { asyncValidate } from '../../helpers/validation';
import { connect } from 'react-redux';
import { saveChanges, resetUserData } from '../../ducks/editUser';
import { getUserData } from '../../ducks/auth';
import { scrollToFirstError } from '../../helpers/scrollToError';

class EditUserProfile extends Component {
    componentWillUnmount = () => {
        const { dispatch } = this.props;

        dispatch(resetUserData());
        dispatch(getUserData());
    };

    render() {
        const {
            handleSubmit,
            ava,
            initialValues,
            dispatch,
            pristine,
            name,
            isAvaPristine,
            isSocial
        } = this.props;

        return (
            <section className="clearfix profileSection">
                <div className="container">
                    <div className="row">
                        <Avatar ava={ava} />

                        <div className="col-md-8 col-sm-7 col-xs-12">
                            <Form
                                autoComplete="off"
                                onSubmit={handleSubmit((val) =>
                                    dispatch(saveChanges(diff(val, initialValues)))
                                )}
                            >
                                <Field name="private" component={Radio} />
                                <AboutYou name={name} />
                                <div className="btn-area mt30">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={pristine && isAvaPristine}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </Form>
                            <Password isSocial={isSocial} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const selector = formValueSelector('userProfile');

const mapStateToProps = (state) => {
    return {
        ava: state.editUser.avatarPreview,
        isAvaPristine: state.editUser.isPristine,
        name: selector(state, 'name'),
        isSocial: state.auth.userData.isSocial,
        initialValues: { ...state.auth.userData, private: String(state.auth.userData.private) }
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: 'userProfile',
        touchOnBlur: false,
        touchOnChange: true,
        asyncValidate,
        asyncChangeFields: ['email', 'name'],
        onSubmitFail: (errors) => scrollToFirstError(errors)
    })(EditUserProfile)
);
