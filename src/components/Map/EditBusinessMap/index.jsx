import React, { Component } from 'react';
import MapClass from '../../../helpers/Map/editBusiness';
import { debounce, isEqual } from 'lodash-es';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { resetLabels } from '../../../ducks/addBusiness';
import { renderTrue } from '../../../helpers/common';

class AddBusinessMap extends Component {
    componentDidMount = () => {
        const { loc, dispatch, reduxFormName, clickedCoords } = this.props;
        this.map = new MapClass(loc, dispatch, reduxFormName);
        this.geocoder = this.map.getGeocoder();
        this.map.addMarker(clickedCoords, true);
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
            searchText: `${renderTrue(buildingNumber)} ${renderTrue(streetNumber)} ${renderTrue(
                streetName,
                true
            )} ${areaLabel} ${cityLabel}`
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

const mapStateToProps = (state, ownProps) => {
    return {
        clickedCoords: formValueSelector(ownProps.reduxFormName)(state, 'latitude', 'longitude'),
        street: formValueSelector(ownProps.reduxFormName)(
            state,
            'buildingNumber',
            'streetName',
            'streetNumber'
        ),
        areaLabel: state.addBusiness.areaLabel,
        cityLabel: state.addBusiness.cityLabel
    };
};

export default connect(mapStateToProps)(AddBusinessMap);
