import React, { Component } from 'react';
import MapWithRouting from '../../../helpers/Map/routing';
import RouteInfo from '../RouteInfo';

import { connect } from 'react-redux';
import { isEqual } from 'lodash-es';
import { RESET_ROUTE_DATA, updRouteType, RESET_DRAGGED_LOC } from '../../../ducks/mapRouting';

class BusinessProfileMap extends Component {
    componentDidMount = () => {
        const { loc, dispatch } = this.props;
        this.map = new MapWithRouting(loc, dispatch);
        this.map.addMarker(loc);
    };

    componentWillUnmount = () => {
        this.map.removeListeners();
        this.props.dispatch({ type: RESET_ROUTE_DATA });
    };

    componentDidUpdate = (prevProps) => {
        const { draggedLoc, businessLoc, routeType, userLoc } = this.props;

        if (!draggedLoc) {
            if (
                (!isEqual(prevProps.businessLoc, businessLoc) ||
                    prevProps.routeType !== routeType) &&
                businessLoc
            ) {
                this.map.calculateRouteFromAtoB(userLoc, businessLoc, routeType);
            }
        } else {
            if (!isEqual(prevProps.draggedLoc, draggedLoc) || prevProps.routeType !== routeType) {
                this.map.calculateRouteFromAtoB(draggedLoc, businessLoc, routeType);
            }
        }
    };

    getDirection = (e) => {
        e.preventDefault();
        const { userLoc, businessLoc, dispatch } = this.props;
        dispatch({ type: RESET_DRAGGED_LOC });
        dispatch(updRouteType('car'));
        this.map.calculateRouteFromAtoB(userLoc, businessLoc, 'car');
    };

    render() {
        const { routeInfo, dispatch, routeType, isRoute } = this.props;

        return (
            <React.Fragment>
                <div className="map-section-wrapper">
                    <div className="map-section" id="map-section" style={{ height: '338px' }} />
                    {routeInfo && (
                        <RouteInfo
                            routeInfo={routeInfo}
                            dispatch={dispatch}
                            routeType={routeType}
                            isRoute={isRoute}
                        />
                    )}
                </div>
                <div className="listingReview">
                    <a href="#" className="btn btn-primary" onClick={this.getDirection}>
                        Get Directions
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    userLoc: state.auth.geoLocation,
    draggedLoc: state.mapRouting.draggedLoc,
    businessLoc: state.businessProfile.business.geoLocation,
    routeInfo: state.mapRouting.routeInfo,
    routeType: state.mapRouting.routeType,
    isRoute: state.mapRouting.wasFound
});

export default connect(mapStateToProps)(BusinessProfileMap);
