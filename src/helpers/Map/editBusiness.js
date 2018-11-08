import { change } from 'redux-form';

class Map {
    constructor(loc, dispatch, form = 'addBusiness') {
        this.platform = new H.service.Platform({
            app_id: 'Akw1c3NPA5BsuXYlv4c6',
            app_code: 'uS9_iY6zU9NPyMdJjL_wAg',
            useHTTPS: true
        });

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
            center: loc ? { lng: loc.longitude, lat: loc.latitude } : null
        });

        this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

        // Create the default UI components
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.geocoder = this.platform.getGeocodingService();
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

    getGeocoder = () => {
        return this.geocoder;
    };

    getBehavior = () => {
        return this.behavior;
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
            this.businessMarker.setPosition(position);
            this.sendCoordToRedux(position);
            this.map.setCenter(position, true);
        }
    };

    removeListeners = () => {
        this.map.dispose();
    };

    handleDragStart = (ev) => {
        var target = ev.target;
        if (target instanceof H.map.Marker || target instanceof mapsjs.map.DomMarker) {
            this.behavior.disable();
        }
    };

    handleDrag = (ev) => {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof mapsjs.map.Marker || target instanceof mapsjs.map.DomMarker) {
            target.setPosition(this.map.screenToGeo(pointer.viewportX, pointer.viewportY));
        }
    };

    handleDragEnd = (ev) => {
        var target = ev.target;
        const dispatch = this.dispatch;
        if (target instanceof mapsjs.map.Marker || target instanceof mapsjs.map.DomMarker) {
            this.behavior.enable();
            dispatch(change(this.formName, 'longitude', String(ev.target.b.lng)));
            dispatch(change(this.formName, 'latitude', String(ev.target.b.lat)));
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
