import React, { Component, Suspense, lazy } from 'react';

import Explore from './Explore';
import Home from './Home';
import ResetPass from './ResetPassword';
import EditUserProfile from './EditUserProfile';
import BusinessProfile from './BusinessProfile';
import AddBusiness from './AddBusiness';
import BusinessCenter from './BusinessCenterWrapper';
import Categories from './Categories';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import Preloader from '../components/UI/Preloader';
import Success from './Success';
import GuardRoute from '../helpers/guardRoutes';
import Transform from '../components/Animation/Translate';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getSocialLinks,
    showModalAction,
    hideAndResetModel,
    getUserData,
    showPreloaderAction
} from '../ducks/auth';
import { getGeolocation } from '../ducks/auth';
import {
    getTagsAction,
    getCategoryAction,
    getAreaAction,
    getCategoryWithChildrenAction,
    getCityAction,
    getServicesAction,
    getAllTagsAction,
    addSubcategoryToCategory,
    getProductsAction,
    getCategoryByRatingAction
} from '../ducks/dropdown';
import { hideMenu } from '../helpers/common';

export class Pages extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;

        dispatch(showPreloaderAction());
        dispatch(getGeolocation());
    };

    componentDidMount = () => {
        const { dispatch } = this.props;

        const childrenCat = JSON.parse(sessionStorage.getItem('childrenCat'));

        dispatch(getSocialLinks());
        dispatch(getTagsAction());
        dispatch(getAllTagsAction());
        dispatch(getCategoryAction()).then(() => {
            if (childrenCat) {
                dispatch(addSubcategoryToCategory(childrenCat));
            }
        });
        dispatch(getCategoryByRatingAction());
        dispatch(getCategoryWithChildrenAction());
        dispatch(getAreaAction());
        dispatch(getCityAction());
        dispatch(getUserData());
        dispatch(getServicesAction());
        dispatch(getProductsAction());
    };

    componentDidUpdate = (prevProps) => {
        const { pathname } = this.props.location;
        if (prevProps.location.pathname !== pathname) {
            hideMenu();
        }
    };

    handleShowModal = () => this.props.dispatch(showModalAction());

    handleHideAndResetModal = () => this.props.dispatch(hideAndResetModel());

    render() {
        const { isAuth, showModal, preloader, dispatch } = this.props;
        return (
            <React.Fragment>
                {!preloader ? (
                    <div className="main-wrapper">
                        <Header isAuth={isAuth} showModal={this.handleShowModal} />
                        <Suspense fallback={<Preloader />}>
                            <Switch>
                                <Route
                                    path="/"
                                    render={(props) => (
                                        <Home {...props} isAuth={isAuth} dispatch={dispatch} />
                                    )}
                                    exact
                                />

                                <Route path="/explore/:search" component={Explore} />
                                <Route path="/change-password/:token" component={ResetPass} />
                                <Route path="/categories" component={Categories} />
                                <GuardRoute
                                    path="/edit-profile"
                                    component={EditUserProfile}
                                    isAuth={isAuth}
                                />
                                <GuardRoute
                                    path="/add-business"
                                    component={AddBusiness}
                                    isAuth={isAuth}
                                />
                                <GuardRoute
                                    path="/business-center"
                                    component={BusinessCenter}
                                    isAuth={isAuth}
                                />
                                <Route path="/verification/:type" component={Success} />
                                <Route path="/:linkID" component={BusinessProfile} />
                            </Switch>
                        </Suspense>

                        <Footer showModal={this.handleShowModal} isAuth={isAuth} />
                        <Transform in={showModal}>
                            <AuthModal show={showModal} hideModal={this.handleHideAndResetModal} />
                        </Transform>
                    </div>
                ) : (
                    <Preloader />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    showModal: state.auth.showModal,
    userData: state.auth.userData,
    preloader: state.auth.showPreloader
});

export default connect(mapStateToProps)(Pages);
