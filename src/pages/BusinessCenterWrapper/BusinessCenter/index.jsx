import React, { Component } from 'react';
import './style.scss';

import Sidebar from './Sidebar';
import Details from './Details';
import Location from './Location';
import Categories from './Categories';
import Products from './Products';
import Documents from './Documents';
import Gallery from './Galleries';
import Preloader from '../../../components/UI/Preloader';

import { Route, Switch, Link } from 'react-router-dom';
import { getBusinessData, CLEAR_PROFILE } from '../../../ducks/businessProfile';
import { connect } from 'react-redux';
import { renderTrue, moveToTop } from '../../../helpers/common';
import { getOpeningHoursCheckbox, getPaymentOptions } from '../../../ducks/businessCenter';

class BusinessCenter extends Component {
    state = {
        showSidebar: false
    };

    componentWillMount = () => {
        moveToTop();
    };

    componentDidMount = () => {
        const {
            dispatch,
            match: { params }
        } = this.props;

        dispatch(getBusinessData(params.businessId));
        dispatch(getOpeningHoursCheckbox());
        dispatch(getPaymentOptions());
    };

    componentDidUpdate = (prevProps) => {
        const {
            dispatch,
            location,
            match: { params }
        } = this.props;

        if (prevProps.location.key !== location.key) {
            moveToTop();
            dispatch(getBusinessData(params.businessId));
        }
    };

    componentWillUnmount = () => {
        this.props.dispatch({ type: CLEAR_PROFILE });
    };

    handleToggleSidebar = (bool) => this.setState({ showSidebar: bool });

    render() {
        if (!this.props.business) {
            return <Preloader />;
        }
        const {
            match: { path },
            business
        } = this.props;

        const { showSidebar } = this.state;

        return (
            <section className="clearfix editBusinessProfile">
                <div
                    className="editDetailsTitle visible-xs"
                    onClick={() => this.handleToggleSidebar(true)}
                >
                    <span className="menu-icon">
                        <i className="fa fa-bars" aria-hidden="true" />
                    </span>
                    Edit Details
                </div>
                <div className="editMainSection">
                    <Sidebar isShow={showSidebar} toggleSidebar={this.handleToggleSidebar} />
                    <div className="rightPanel bg-dark">
                        <div className="infoArea">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="businessName">{business.listingTitle}</p>
                                    <p className="businessAddress">
                                        <i className="fa fa-map-marker" aria-hidden="true" />
                                        {` ${renderTrue(business.area.name, true)} ${renderTrue(
                                            business.city.name
                                        )} - United Arab Emirates`}
                                    </p>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <Link
                                        className="btn btn-default btn-view"
                                        to={`/${business.linkId}`}
                                    >
                                        <i className="fa fa-eye" aria-hidden="true" /> View Business
                                        Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Switch>
                            <Route path={`${path}/`} component={Details} exact />
                            <Route
                                path={`${path}/location`}
                                render={(props) => <Location {...props} business={business} />}
                            />
                            <Route
                                path={`${path}/categories`}
                                render={(props) => <Categories {...props} />}
                            />
                            <Route path={`${path}/products`} component={Products} />
                            <Route path={`${path}/galleries`} component={Gallery} />
                            <Route path={`${path}/documents`} component={Documents} />
                        </Switch>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    business: state.businessProfile.business
});
export default connect(mapStateToProps)(BusinessCenter);
