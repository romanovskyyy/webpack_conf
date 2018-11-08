import React, { Component } from 'react';
import MapClass from '../../../helpers/Map/map';
import { debounce, isEqual } from 'lodash';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { resetLabels } from '../../../ducks/addBusiness';

class AddBusinessMap extends Component {
    componentDidMount = () => {
        const { loc, dispatch, reduxFormName } = this.props;
        this.map = new MapClass(loc, dispatch, true, reduxFormName);
        this.geocoder = this.map.getGeocoder();
        this.map.addMarkerDblClick();
    };

    componentWillUnmount = () => {
        const { dispatch } = this.props;
        dispatch(resetLabels());
    };

    componentDidUpdate = (prevProps) => {
        const { street, clickedCoords, areaLabel, cityLabel } = this.props;
        if (
            !isEqual(prevProps.street, street) ||
            prevProps.areaLabel !== areaLabel ||
            prevProps.cityLabel !== cityLabel
        ) {
            this.handleFindByGeocode();
            return;
        }
        if (!isEqual(prevProps.clickedCoords, clickedCoords)) {
            if (clickedCoords.latitude && clickedCoords.longitude) {
                this.handleReverseGeocode();
            }
        }
    };

    handleFindByGeocode = debounce(() => {
        const {
            street: { streetNumber = '', streetName = '', buildingNumber = '' },
            areaLabel = '',
            cityLabel = ''
        } = this.props;
        const geocodingParams = {
            searchText: `${buildingNumber} ${streetNumber} ${streetName}, ${areaLabel} ${cityLabel}`
        };

        this.geocoder.geocode(geocodingParams, this.map.onResult, (e) => {
            console.error(e);
        });
    }, 400);

    handleReverseGeocode = debounce(() => {
        const { clickedCoords } = this.props;
        let reverseGeocodingParameters = {
            prox: `${clickedCoords.latitude},${clickedCoords.longitude},150`,
            mode: 'retrieveAddresses',
            maxresults: 1
        };
        this.geocoder.reverseGeocode(reverseGeocodingParameters, this.map.onResult, function(e) {
            console.error(e);
        });
    }, 400);

    render() {
        return <div className="map-section" id="map-section" style={{ height: '300px' }} />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    loc: state.auth.geoLocation,
    clickedCoords: formValueSelector(ownProps.reduxFormName)(state, 'latitude', 'longitude'),
    street: formValueSelector(ownProps.reduxFormName)(
        state,
        'buildingNumber',
        'streetName',
        'streetNumber'
    ),
    areaLabel: state.addBusiness.areaLabel,
    cityLabel: state.addBusiness.cityLabel,
    page: state.explore.search.page
});

export default connect(mapStateToProps)(AddBusinessMap);
