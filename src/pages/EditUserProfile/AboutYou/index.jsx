import React from 'react';
import './style.scss';

import EditUserInput from '../../../components/UI/EditUserInput';

import { Field } from 'redux-form';
import { required } from '../../../helpers/validation';
import { phone, noWhiteSpace } from '../../../helpers/normalize';

const AboutYou = ({ name }) => {
    return (
        <div className="dashboardBoxBg mt30">
            <div className="profileIntro">
                <h3>About You</h3>
                <div className="row">
                    <Field
                        name="name"
                        type="text"
                        className="col-sm-12"
                        label="Username"
                        component={EditUserInput}
                        validate={[required]}
                        normalize={(val) => noWhiteSpace(val)}
                    />
                    <div className="field-wrapper_error-bug">
                        <Field
                            name="firstName"
                            type="text"
                            className="col-sm-6"
                            label="First Name"
                            component={EditUserInput}
                            validate={required}
                        />
                        <Field
                            name="lastName"
                            type="text"
                            className="col-sm-6"
                            label="Last Name"
                            component={EditUserInput}
                            validate={required}
                        />
                    </div>
                    <Field
                        name="email"
                        type="text"
                        className="col-sm-6"
                        label="Email"
                        component={EditUserInput}
                        validate={[required]}
                    />
                    <Field
                        name="phone"
                        type="text"
                        className="col-sm-6"
                        label="Phone"
                        component={EditUserInput}
                        validate={[required]}
                        normalize={(val) => phone(val)}
                    />
                    <Field
                        name="about"
                        type="textarea"
                        label="About You"
                        component={EditUserInput}
                    />
                    <div className="form-group col-xs-12">
                        <label>Link</label>
                        <input
                            className="form-control"
                            type="text"
                            autoComplete="new-password"
                            disabled
                            value={`${process.env.CLIENT_URL}/${name}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutYou;
