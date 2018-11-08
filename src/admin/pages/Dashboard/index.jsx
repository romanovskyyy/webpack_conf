import React from 'react';

import Header from '../../components/Header';
import BusinessCenter from './BusinessCenterWrapper';

import { connect } from 'react-redux';
import { getBusinessList } from '../../ducks/businessCenter';

class Dashboard extends React.Component {
    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch(getBusinessList());
    };

    render() {
        const { logout } = this.props;

        return (
            <div>
                <Header />
                <BusinessCenter />
            </div>
        );
    }
}

export default connect()(Dashboard);
