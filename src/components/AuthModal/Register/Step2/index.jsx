import React, { Component } from 'react';

import AuthInput from '../../../UI/AuthInput';
import ErrorDiv from '../../ErrorDiv';

import { Field } from 'redux-form';
import { required, minValue8, passwordsMatch, password } from '../../../../helpers/validation';
import { specialCharacters } from '../../../../helpers/normalize';

class Step2 extends Component {
    componentDidMount = () => {
        this.props.startAsyncValidate();
    };

    render() {
        const { next, prev, errorText, valid, submitFailed } = this.props;

        return (
            <div id="step2" className="step-content-body">
                <div className="form">
                    <Field
                        name="email"
                        icon="fa-envelope"
                        type="email"
                        component={AuthInput}
                        placeholder="Email"
                        validate={[required]}
                        normalize={(val) => val.slice(0, 1000)}
                    />
                    <Field
                        name="password"
                        icon="fa-lock"
                        type="password"
                        component={AuthInput}
                        placeholder="Password"
                        validate={[required, minValue8, password]}
                        normalize={(val) => specialCharacters(val)}
                    />
                    <Field
                        name="confirm"
                        icon="fa-lock"
                        type="password"
                        component={AuthInput}
                        placeholder="Repeat Password"
                        validate={[required, minValue8, passwordsMatch, password]}
                        normalize={(val) => specialCharacters(val)}
                    />
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
    }
}

export default Step2;
