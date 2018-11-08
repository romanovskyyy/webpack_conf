import React, { Component } from 'react';
import './style.scss';

import Carousel from './Carousel';
import Header from './Header';
import Info from './Info';
import Tabs from './Tabs';
import Preloader from '../../components/UI/Preloader';

import ErrorBoundary from '../../components/ErrorBoundary';

import { connect } from 'react-redux';
import { getBusinessData, clearProfile } from '../../ducks/businessProfile';
import { resetFiles } from '../../ducks/files';
import { moveToTop, createDeepEqualSelector } from '../../helpers/common';

class BusinessProfile extends Component {
    componentWillMount = () => {
        moveToTop();
    };

    componentDidMount = () => {
        const {
            dispatch,
            match: { params }
        } = this.props;

        dispatch(getBusinessData(params.linkID));
    };

    componentWillUnmount = () => {
        const { dispatch } = this.props;

        dispatch(resetFiles());
        dispatch(clearProfile());
    };

    render() {
        const {
            data,
            match: { params },
            gallery
        } = this.props;

        if (!data) {
            return <Preloader />;
        }

        return (
            <React.Fragment>
                <Carousel data={data} />
                <Header data={data} />
                <ErrorBoundary>
                    <Info data={data} linkId={params.linkID} showModal={this.handleShowModal} />
                </ErrorBoundary>
                <Tabs data={data} gallery={gallery} />
            </React.Fragment>
        );
    }
}

const getGallery = ({ gallery }) => gallery;

const getGallerySelector = createDeepEqualSelector(getGallery, (photos) =>
    photos.map((photo) => ({
        src: photo.storageUrl,
        width: 1,
        height: 1
    }))
);

const mapStateToProps = (state) => ({
    data: state.businessProfile.business,
    gallery: state.businessProfile.business
        ? getGallerySelector(state.businessProfile.business)
        : []
});

export default connect(mapStateToProps)(BusinessProfile);
