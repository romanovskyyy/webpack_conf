import Map from './map';

import {
    getRouteInfo,
    wasRouteFound,
    draggedLocCheckpoint,
    restoreDraggedLoc
} from '../../ducks/mapRouting';

class Routing extends Map {
    constructor(loc, dispatch) {
        super(loc, dispatch);
        this.dispatch = dispatch;
        this.deletable = false;
        this.showPopup = true;
    }

    calculateRouteFromAtoB = (userLoc, businessLoc, mode) => {
        this.router = this.platform.getRoutingService();
        this.userLoc = userLoc;
        const routeRequestParams = {
            mode: `fastest;${mode}`,
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
            waypoint0: `${userLoc.latitude},${userLoc.longitude}`,
            waypoint1: `${businessLoc.latitude},${businessLoc.longitude}`
        };

        this.router.calculateRoute(routeRequestParams, this.onSuccessRoute, this.onErrorRoute);
    };

    onErrorRoute = (error) => {
        alert('Ooops!');
    };

    onSuccessRoute = (result) => {
        if (result.response) {
            var route = result.response.route[0];

            this.handleRemovePrevRoute();

            this.addRouteShapeToMap(route);
            this.addManueversToMap(route);

            this.dispatch(getRouteInfo(this.getRouteInfoObject(route)));
            this.dispatch(wasRouteFound(true));
        } else {
            this.dispatch(wasRouteFound(false));
            this.dispatch(restoreDraggedLoc());
            this.handlePutMarkerToTheLastSuccessRoute();
        }
    };

    handlePutMarkerToTheLastSuccessRoute = () => {
        if (this.userLoc.latitude && this.userLoc.longitude) {
            this.markerStart.setPosition({
                lat: this.userLoc.latitude,
                lng: this.userLoc.longitude
            });
        }
    };

    handleRemovePrevRoute = () => {
        if (this.deletable && this.routeLine) {
            this.map.removeEventListener('drag', this.handleDrag);
            this.map.removeEventListener('dragend', this.handleDragEnd);
            this.map.removeEventListener('dragstart', this.handleDragStart);
            this.map.removeObject(this.routeLine);
            this.map.removeObject(this.markerStart);
            this.map.removeObject(this.markerEnd);
            this.deletable = false;
        }
    };

    addRouteShapeToMap = (route) => {
        var lineString = new H.geo.LineString(),
            routeShape = route.shape;

        routeShape.forEach(function(point) {
            var parts = point.split(',');
            lineString.pushLatLngAlt(parts[0], parts[1]);
        });

        this.routeLine = new H.map.Polyline(lineString, {
            style: {
                lineWidth: 4,
                strokeColor: 'rgba(0, 128, 255, 0.7)'
            }
        });
        // Add the polyline to the map
        this.map.addObject(this.routeLine);
        // And zoom to its bounding rectangle
        this.map.setViewBounds(this.routeLine.getBounds(), true);
    };

    addManueversToMap = (route) => {
        let svgMarkup =
                '<svg width="20" height="20" ' +
                'xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="10" cy="10" r="10" ' +
                'fill="#1b468d" stroke="white" stroke-width="1"  />' +
                '</svg>',
            dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 10, y: 10 } });

        if (window.innerWidth < 768) {
            svgMarkup =
                '<svg width="40" height="40" ' +
                'xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="20" cy="20" r="20" ' +
                'fill="#1b468d" stroke="white" stroke-width="1"  />' +
                '</svg>';
            dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 20, y: 20 } });
        }

        let routeStart = route.leg[0].maneuver[0];
        let routeEnd = route.leg[0].maneuver[route.leg[0].maneuver.length - 1];

        this.markerStartPosition = {
            lat: routeStart.position.latitude,
            lng: routeStart.position.longitude
        };
        this.markerStart = new H.map.Marker(this.markerStartPosition, { icon: dotIcon });
        this.dispatch(
            draggedLocCheckpoint({
                latitude: this.markerStartPosition.lat,
                longitude: this.markerStartPosition.lng
            })
        );

        if (this.showPopup) {
            this.routePopup = new H.ui.InfoBubble(this.markerStartPosition);
            this.routePopup.addClass('route-popup');
            this.routePopup.setContent('Drag to change routing');
            this.ui.addBubble(this.routePopup);
        } else {
            this.ui.removeBubble(this.routePopup);
        }

        this.addDraggableMarker(this.markerStart);
        this.markerEnd = new H.map.Marker(
            {
                lat: routeEnd.position.latitude,
                lng: routeEnd.position.longitude
            },
            { icon: dotIcon }
        );
        this.map.addObject(this.markerStart);
        this.map.addObject(this.markerEnd);
        this.deletable = true;
        this.showPopup = false;
    };

    getRouteInfoObject = ({ summary }) => ({
        distance: (summary.distance / 1000).toFixed(1) + ' km',
        travelTime: this.toHHMMSS(summary.travelTime)
    });

    toHHMMSS = (time) => {
        let sec_num = parseInt(time, 10); // don't forget the second param
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return `${hours}h ${minutes}m`;
    };
}

export default Routing;
