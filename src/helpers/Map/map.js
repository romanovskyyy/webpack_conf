import React from 'react';

import InfoWindow from '../../components/Map/InfoWindow';
import MarkerWrapper from '../../components/Map/Marker';
import UserMarker from '../../components/Map/UserMarker';
import { change } from 'redux-form';
import { renderToMarkup } from '../common';
import { updDraggedLoc } from '../../ducks/mapRouting';

class Map {
    constructor(loc, dispatch, useReduxForm = false, form = 'addBusiness') {
        this.platform = new H.service.Platform({
            app_id: 'Akw1c3NPA5BsuXYlv4c6',
            app_code: 'uS9_iY6zU9NPyMdJjL_wAg',
            useHTTPS: true
        });

        this.useReduxForm = useReduxForm;
        this.dispatch = dispatch;
        this.formName = form;

        const pixelRatio = window.devicePixelRatio || 1;
        const defaultLayers = this.platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });
        this.map = new H.Map(document.getElementById('map-section'), defaultLayers.normal.map, {
            pixelRatio: pixelRatio,
            zoom: 10,
            center:
                loc && loc.latitude && loc.longitude
                    ? { lng: loc.longitude, lat: loc.latitude }
                    : null
        });

        this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

        // Create the default UI components
        this.markerGroup = new H.map.Group();
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.geocoder = this.platform.getGeocodingService();
        this.addInfoBubble(this.map, this.ui);
        this.closeInfobox();
    }

    addMarker = (coord, isDragable = false) => {
        const loc = { lat: coord.latitude, lng: coord.longitude };
        this.businessMarker = new H.map.Marker(loc);
        this.map.setCenter(loc, true);
        if (isDragable) {
            this.addDraggableMarker(this.businessMarker);
        } else {
            this.map.addObject(this.businessMarker);
        }
    };

    addUserLocationMarker = (coord) => {
        const loc = { lat: coord.latitude, lng: coord.longitude };
        const markerWrapper = <UserMarker />;
        const domIcon = new H.map.DomIcon(renderToMarkup(markerWrapper));
        this.userLocationMarker = new H.map.DomMarker(loc, { icon: domIcon });
        this.updUserLoc = true;
        this.wasUserIconDeleted = false;
        this.map.setCenter(loc, true);
        this.addDraggableMarker(this.userLocationMarker);
    };

    updateUserLocationMarkerPosition = (coord) => {
        const loc = { lat: coord.latitude, lng: coord.longitude };
        this.userLocationMarker.setPosition(loc);
    };

    setShouldUseUserLoc = (bool) => {
        this.updUserLoc = bool;

        if (!bool && !this.wasUserIconDeleted) {
            this.map.removeObject(this.userLocationMarker);
            this.map.removeEventListener('dragstart', this.handleDragStart, false);
            this.map.removeEventListener('dragend', this.handleUserLocDragEnd, false);
            this.map.removeEventListener('dragend', this.handleDragEnd, false);
            this.wasUserIconDeleted = true;
        }
    };

    getGeocoder = () => {
        return this.geocoder;
    };

    getBehavior = () => {
        return this.behavior;
    };

    removeMarkers = () => {
        this.markerGroup.removeAll();
    };

    removeMarker = () => {
        if (this.map.getObjects().length) {
            this.map.removeObject(this.map.getObjects()[0]);
        }
    };

    sendCoordToRedux = (position) => {
        const dispatch = this.dispatch;

        dispatch(change(this.formName, 'latitude', String(position.lat)));
        dispatch(change(this.formName, 'longitude', String(position.lng)));
    };

    onResult = (result) => {
        if (result.Response && result.Response.View.length) {
            let locations = result.Response.View[0].Result;
            const position = {
                lat: locations[0].Location.DisplayPosition.Latitude,
                lng: locations[0].Location.DisplayPosition.Longitude
            };
            this.removeMarker();
            this.sendCoordToRedux(position);
            this.resultMarker = new H.map.Marker(position);
            this.addDraggableMarker(this.resultMarker);
            this.map.setCenter(position, true);
        }
    };
    addDomIcon = (item) => {
        const markerWrapper = <MarkerWrapper item={item} />;
        const domIcon = new H.map.DomIcon(renderToMarkup(markerWrapper));
        return domIcon;
    };

    addMarkerToGroup = (arr) => {
        let markerList = [];
        arr.forEach((item) => {
            const infoWindow = <InfoWindow key={item.id} item={item} />;
            const geoLoc = { lat: item.geoLocation.latitude, lng: item.geoLocation.longitude };
            const marker = new H.map.DomMarker(geoLoc, { icon: this.addDomIcon(item) });
            marker.setData(renderToMarkup(infoWindow));
            markerList.push(marker);
        });

        if (markerList.length) {
            this.markerGroup.addObjects(markerList);
            this.map.addObject(this.markerGroup);
            this.map.setViewBounds(this.markerGroup.getBounds());
        }
    };

    removeBubbles = () => {
        const previousBubbles = this.ui.getBubbles();
        previousBubbles.forEach((bubs) => this.ui.removeBubble(bubs));
    };

    addInfoBubble = (map, ui) => {
        map.addObject(this.markerGroup);
        // add 'tap' event listener, that opens info bubble, to the group
        this.markerGroup.addEventListener(
            'tap',
            (evt) => {
                evt.stopPropagation();
                // event target is the marker itself, group is a parent event target
                // for all objects that it contains
                const bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
                    // read custom data
                    content: evt.target.getData()
                });
                const coord = map.screenToGeo(
                    evt.currentPointer.viewportX,
                    evt.currentPointer.viewportY
                );
                bubble.addClass('explore-infobox');
                this.removeBubbles();
                // show info bubble
                map.setCenter(coord, true);
                ui.addBubble(bubble);
            },
            false
        );
    };

    closeInfobox = () => {
        this.map.addEventListener('tap', () => {
            this.removeBubbles();
        });
    };

    removeListeners = () => {
        this.map.dispose();
    };

    addMarkerDblClick = () => {
        this.map.addEventListener('dbltap', (evt) => {
            const coord = this.map.screenToGeo(
                evt.currentPointer.viewportX,
                evt.currentPointer.viewportY
            );
            this.removeMarker();
            this.resultMarker = new H.map.Marker(coord);
            this.sendCoordToRedux(coord);
            this.addDraggableMarker(this.resultMarker);
            this.map.setCenter(coord, true);
            this.map.addObject(this.resultMarker);
        });
    };

    handleDragStart = (ev) => {
        const target = ev.target;
        if (target instanceof H.map.Marker || target instanceof mapsjs.map.DomMarker) {
            this.behavior.disable();
        }
    };

    handleDrag = (ev) => {
        const target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof mapsjs.map.Marker || target instanceof mapsjs.map.DomMarker) {
            target.setPosition(this.map.screenToGeo(pointer.viewportX, pointer.viewportY));
        }
    };

    handleDragEnd = (ev) => {
        const target = ev.target;
        const dispatch = this.dispatch;
        if (target instanceof mapsjs.map.Marker || target instanceof mapsjs.map.DomMarker) {
            this.behavior.enable();
            if (this.useReduxForm) {
                dispatch(change(this.formName, 'longitude', String(ev.target.b.lng)));
                dispatch(change(this.formName, 'latitude', String(ev.target.b.lat)));
            } else {
                dispatch(
                    updDraggedLoc({
                        latitude: ev.target.b.lat,
                        longitude: ev.target.b.lng
                    })
                );
            }
        }
    };

    handleUserLocDragEnd = (ev) => {
        var target = ev.target;
        const dispatch = this.dispatch;
        if (target instanceof mapsjs.map.DomMarker) {
            this.behavior.enable();
            dispatch({
                type: 'SET_GEOLOCATION',
                payload: { longitude: ev.target.b.lng, latitude: ev.target.b.lat }
            });
            this.map.setCenter({ lat: ev.target.b.lat, lng: ev.target.b.lng }, true);
        }
    };

    addDraggableMarker = (marker) => {
        const map = this.map;

        // Ensure that the marker can receive drag events
        marker.draggable = true;
        map.addObject(marker);

        // disable the default draggability of the underlying map
        // when starting to drag a marker object:
        map.addEventListener('dragstart', this.handleDragStart, false);

        if (this.updUserLoc) {
            map.addEventListener('dragend', this.handleUserLocDragEnd, false);
        } else {
            map.addEventListener('dragend', this.handleDragEnd, false);
        }
        // re-enable the default draggability of the underlying map
        // when dragging has completed

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener('drag', this.handleDrag, false);
    };
}
export default Map;
