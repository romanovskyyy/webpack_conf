import React, { Component } from 'react';

import DashboardHeader from './DashboardHeader';
import BusinessList from './BusinessList';
import BusinessCenter from './BusinessCenter';

import { Switch, Route, withRouter } from 'react-router-dom';

class BusinessCenterWrapper extends Component {
    render() {
        const {
            match: { path }
        } = this.props;
        return (
            <React.Fragment>
                <DashboardHeader />
                <Switch>
                    <Route path={path} component={BusinessList} exact />
                    <Route path={`${path}/:businessId`} component={BusinessCenter} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(BusinessCenterWrapper);
