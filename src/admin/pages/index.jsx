import React from 'react';

import Dashboard from './Dashboard';
import Signin from './Signin';

import { Route, Switch } from 'react-router-dom';
import { getCookie } from '../helpers/cookie';
import { connect } from 'react-redux';
import { checkToken } from '../ducks/signin';

class Main extends React.Component {
    componentWillMount = async () => {
        const { dispatch, history } = this.props;

        if (!getCookie('x-admin-token')) {
            return history.push('/admin/signin');
        }
        const isValidToken = await dispatch(checkToken());
        isValidToken ? history.push('/admin/dashboard') : history.push('/admin/signin');
    };

    componentDidUpdate = (prevProps) => {
        const { isAuth, history } = this.props;
        if (prevProps.isAuth !== isAuth && isAuth) {
            history.push('/admin/dashboard');
        }
    };

    render() {
        return (
            <Switch>
                <Route path="/admin/signin" component={Signin} />
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route component={Signin} />
            </Switch>
        );
    }
}

const mapStateToProps = ({ signin }) => ({
    isAuth: signin.isAuth
});

export default connect(mapStateToProps)(Main);
