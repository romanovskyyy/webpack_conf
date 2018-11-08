import React, { Component } from 'react';
import './style.scss';

import MapWithRouting from '../../../helpers/Map/routing';
import RouteInfo from '../RouteInfo';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash-es';
import {
    setSelectedBusinessLocation,
    RESET_ROUTE_DATA,
    toggleUsingRouting
} from '../../../ducks/mapRouting';
import { RESET_BUSINESS } from '../../../ducks/explore';
import { throws } from 'assert';

class ExploreMap extends Component {
    componentDidMount = () => {
        const { userLoc, dispatch } = this.props;
        this.map = new MapWithRouting(userLoc, dispatch);
        if (userLoc.latitude && userLoc.longitude) {
            this.map.addUserLocationMarker(userLoc);
        }
    };

    usingRouting = false;

    componentDidUpdate = (prevProps) => {
        const {
            business = [],
            draggedLoc,
            businessLoc,
            userLoc,
            isPristine,
            dispatch,
            routeType
        } = this.props;

        const shouldCalculate =
            (!isEqual(prevProps.businessLoc, businessLoc) || prevProps.routeType !== routeType) &&
            businessLoc;

        const shouldCalculateDragged =
            !isEqual(prevProps.draggedLoc, draggedLoc) ||
            !isEqual(prevProps.businessLoc, businessLoc) ||
            prevProps.routeType !== routeType;

        if (!isEqual(prevProps.userLoc, userLoc) && userLoc.latitude && userLoc.longitude) {
            this.map.updateUserLocationMarkerPosition(userLoc);
        }

        if (!isEqual(prevProps.business, business) && !isPristine) {
            this.map.removeMarkers();
            this.map.removeBubbles();
            this.map.addMarkerToGroup(business);
            if (this.usingRouting) {
                this.map.handleRemovePrevRoute();
                this.map.addUserLocationMarker(userLoc);
                this.usingRouting = false;
            }
            dispatch(setSelectedBusinessLocation(null));
            dispatch({ type: RESET_ROUTE_DATA });
            return;
        }

        // draggecLoc - waypoint[0] location for routing
        // else if we should use userCurrent location for routing

        if (!draggedLoc) {
            if (shouldCalculate) {
                this.usingRouting = true;
                this.map.setShouldUseUserLoc(false);
                this.map.calculateRouteFromAtoB(userLoc, businessLoc, routeType);
            }
        } else {
            if (shouldCalculateDragged) {
                this.usingRouting = true;
                this.map.calculateRouteFromAtoB(draggedLoc, businessLoc, routeType);
            }
        }
    };

    componentWillUnmount = () => {
        this.map.removeListeners();
        this.props.dispatch({ type: RESET_ROUTE_DATA });
        this.props.dispatch({ type: RESET_BUSINESS });
    };

    render() {
        const { routeInfo, dispatch, routeType, isRoute } = this.props;
        return (
            <div className="map-section-wrapper">
                <div className="map-section" id="map-section" style={{ height: '100vh' }} />
                {routeInfo && (
                    <RouteInfo
                        routeInfo={routeInfo}
                        dispatch={dispatch}
                        routeType={routeType}
                        isRoute={isRoute}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    userLoc: { latitude: state.explore.search.lat, longitude: state.explore.search.lon },
    draggedLoc: state.mapRouting.draggedLoc,
    businessLoc: state.mapRouting.selectedBusinessLoc,
    isPristine: state.explore.isPristine,
    routeInfo: state.mapRouting.routeInfo,
    routeType: state.mapRouting.routeType,
    isRoute: state.mapRouting.wasFound
});
export default connect(mapStateToProps)(ExploreMap);
