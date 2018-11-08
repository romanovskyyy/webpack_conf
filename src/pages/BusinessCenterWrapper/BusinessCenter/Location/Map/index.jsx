import React, { Component } from 'react';

import EditBusinessMap from '../../../../../components/Map/EditBusinessMap';
import EditUserInput from '../../../../../components/UI/EditUserInput';

import { Field } from 'redux-form';
import { required } from '../../../../../helpers/validation';
import { onlyDigitsAndDot } from '../../../../../helpers/normalize';

export default class MapWrapper extends Component {
    render() {
        return (
            <div className="col-sm-6">
                <h4>Confirm Location</h4>
                <p>
                    To be sure your customers can find your business, check the location below is
                    correct. Reposition the pin if required to update the address.
                </p>
                <div className="locationFormAreaRight">
                    <EditBusinessMap reduxFormName="businessCenter" />
                    <div className="row">
                        <Field
                            name="latitude"
                            component={EditUserInput}
                            type="text"
                            placeholder="Latitude"
                            className="col-sm-6"
                            validate={required}
                            normalize={(val) => onlyDigitsAndDot(val)}
                        />
                        <Field
                            name="longitude"
                            component={EditUserInput}
                            type="text"
                            placeholder="Longitude"
                            className="col-sm-6"
                            validate={required}
                            normalize={(val) => onlyDigitsAndDot(val)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
