import React, { Component } from 'react';

import EditUserInput from '../../../../components/UI/EditUserInput';
import DropDown from '../../../../components/UI/DropDown';
import MapWrapper from './Map';

import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import { required } from '../../../../helpers/validation';
import { updateBusiness } from '../../../../ducks/businessCenter';
import { onlyDigits } from '../../../../helpers/normalize';

class Location extends Component {
    render() {
        const {
            area,
            city,
            handleSubmit,
            dispatch,
            business,
            initialValues,
            match: {
                params: { businessId: businessLink }
            }
        } = this.props;
        return (
            <div className="businessInfoPanel">
                <div className="locationSection">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Location</h3>
                        </div>
                    </div>
                    <Form
                        onSubmit={handleSubmit((val) =>
                            dispatch(updateBusiness(val, business.id, businessLink))
                        )}
                    >
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>Street Address</h4>
                                <p>Ensure your address is up to date.</p>
                                <div className="locationFormArea">
                                    <div className="row_custom">
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-12"
                                            name="buildingName"
                                            label="Building Name"
                                            placeholder="E.g. Building 1"
                                        />
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-6"
                                            name="buildingNumber"
                                            label="Building Number"
                                            placeholder="E.g. Building 1"
                                        />
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-6"
                                            name="level"
                                            label="Level / Unit"
                                            placeholder="E.g. Level 1"
                                        />
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-6"
                                            name="streetNumber"
                                            label="Street Number"
                                            placeholder="E.g. 2138"
                                            normalize={(val) => (val ? onlyDigits(val) : '')}
                                        />
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-6"
                                            name="streetName"
                                            label="Street Name"
                                            placeholder="E.g. 2138"
                                        />

                                        <div className="form-group col-sm-6 col-xs-12">
                                            <label for="UserNameProfile">Street Type</label>
                                            <div className="searchPart">
                                                <Field
                                                    name="streetType"
                                                    component={DropDown}
                                                    defaultText="Street Type"
                                                    savedValue={initialValues.streetType}
                                                    className={{
                                                        select: 'search dropdown street',
                                                        wrapper: 'searchPartInner',
                                                        withDots: '.search.dropdown.street'
                                                    }}
                                                    options={[
                                                        { value: 'st', label: 'St' },
                                                        { value: 'rd', label: 'Rd' }
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group col-sm-6 col-xs-12">
                                            <label for="UserNameProfile">Area</label>
                                            <div className="searchPart">
                                                <Field
                                                    name="area"
                                                    component={DropDown}
                                                    validate={required}
                                                    savedValue={initialValues.area}
                                                    defaultText="Area"
                                                    parse={(val) => (val ? Number(val) : '')}
                                                    className={{
                                                        select: 'search dropdown area',
                                                        wrapper: 'searchPartInner',
                                                        withDots: '.search.dropdown.area'
                                                    }}
                                                    options={area}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-sm-6 col-xs-12">
                                            <label for="UserNameProfile">City</label>
                                            <div className="searchPart">
                                                <Field
                                                    name="city"
                                                    component={DropDown}
                                                    validate={required}
                                                    savedValue={initialValues.city}
                                                    defaultText="City"
                                                    className={{
                                                        select: 'search dropdown city',
                                                        wrapper: 'searchPartInner',
                                                        withDots: '.search.dropdown.city'
                                                    }}
                                                    options={city}
                                                />
                                            </div>
                                        </div>
                                        <Field
                                            component={EditUserInput}
                                            type="text"
                                            className="col-sm-6"
                                            name="poBox"
                                            label="P.O.Box"
                                            validate={required}
                                            placeholder="E.g. 2138"
                                        />
                                    </div>
                                </div>
                            </div>
                            <MapWrapper />
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="submitButtonArea">
                                    <button type="submit" className="btn btn-primary">
                                        Save Change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: {
        buildingName: state.businessProfile.business.buildingName,
        buildingNumber: state.businessProfile.business.buildingNumber,
        level: state.businessProfile.business.level,
        streetNumber: state.businessProfile.business.streetNumber,
        streetName: state.businessProfile.business.streetName,
        area: state.businessProfile.business.area.id,
        city: state.businessProfile.business.city.id,
        poBox: state.businessProfile.business.poBox,
        streetType: state.businessProfile.business.streetType,
        latitude: state.businessProfile.business.geoLocation.latitude,
        longitude: state.businessProfile.business.geoLocation.longitude
    },
    area: state.dropdown.area,
    city: state.dropdown.city,
    business: state.businessProfile.business
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'businessCenter',
        enableReinitialize: true,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true
    })(Location)
);
