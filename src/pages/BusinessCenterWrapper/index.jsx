import React, { Component } from 'react';

import DashboardHeader from './DashboardHeader';
import BusinessList from './BusinessList';
import BusinessCenter from './BusinessCenter';

import { Switch, Route } from 'react-router-dom';

export default class BusinessCenterWrapper extends Component {
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
