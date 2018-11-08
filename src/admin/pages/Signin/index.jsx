import React from 'react';
import './style.scss';

import LoginInput from '../../components/UI/LoginInput';

import { connect } from 'react-redux';
import { login } from '../../ducks/signin';
import { reduxForm, Field, Form } from 'redux-form';
import { required } from '../../helpers/validation';
import SearfiLogo from '../../assets/searfilogo.svg';

class Signin extends React.Component {
    handleSubmit = (values) => {
        const { dispatch } = this.props;

        dispatch(login(values));
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="admin-login-form">
                <SearfiLogo width={100} height={35} />
                <span>Log In To Administer The Site</span>
                <Form onSubmit={handleSubmit((val) => this.handleSubmit(val))}>
                    <Field
                        name="username"
                        component={LoginInput}
                        placeholder="Login"
                        type="text"
                        validate={[required]}
                    />
                    <Field
                        name="pass"
                        component={LoginInput}
                        placeholder="Password"
                        type="password"
                        validate={[required]}
                    />
                    <button type="submit">Login</button>
                </Form>
            </div>
        );
    }
}

export default connect()(
    reduxForm({
        form: 'login',
        touchOnChange: false,
        touchOnBlur: false
    })(Signin)
);
