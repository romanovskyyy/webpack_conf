import React, { Component } from 'react';

import AddBusinessInp from '../../../components/UI/AddBusinessInp';
import DropDown from '../../../components/UI/DropDown';
import AddBusinessMap from '../../../components/Map/AddBusinessMap';

import { Field } from 'redux-form';
import { required, email } from '../../../helpers/validation';
import { onlyDigits, phone, onlyDigitsAndDot } from '../../../helpers/normalize';

class Step1 extends Component {
    render() {
        const { next, cityVal, areaVal, area, city } = this.props;

        return (
            <div className="tab-pane">
                <div className="form-section-one">
                    <h3>Add your business details</h3>
                    <div className="row">
                        <Field
                            name="name"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Business Name"
                            validate={required}
                            className="col-sm-12"
                        />
                        <Field
                            name="buildingNumber"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Building Number"
                            className="col-sm-3"
                        />
                        <Field
                            name="buildingName"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Building Name"
                            className="col-sm-6"
                        />
                        <Field
                            name="level"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Level/Unit"
                            className="col-sm-3"
                        />
                        <Field
                            name="streetNumber"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Street Number"
                            className="col-sm-4"
                            normalize={(val) => (val ? onlyDigits(val) : '')}
                        />
                        <Field
                            name="streetName"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Street Name"
                            className="col-sm-8"
                        />

                        <div className="col-sm-5">
                            <div className="searchPart">
                                <div className="searchPartInner">
                                    <Field
                                        name="city"
                                        component={DropDown}
                                        validate={required}
                                        savedValue={cityVal}
                                        defaultText="City"
                                        className={{
                                            select: 'search dropdown city',
                                            wrapper: 'searchSelectboxes',
                                            withDots: '.search.dropdown.city'
                                        }}
                                        options={city}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="searchPart">
                                <div className="searchPartInner">
                                    <Field
                                        name="area"
                                        component={DropDown}
                                        validate={required}
                                        savedValue={areaVal}
                                        defaultText="Area"
                                        className={{
                                            select: 'search dropdown area',
                                            wrapper: 'searchSelectboxes',
                                            withDots: '.search.dropdown.area'
                                        }}
                                        options={area}
                                    />
                                </div>
                            </div>
                        </div>

                        <Field
                            name="poBox"
                            component={AddBusinessInp}
                            type="number"
                            placeholder="PO Box"
                            validate={required}
                            normalize={(val) => onlyDigits(val)}
                            className="col-sm-3"
                        />
                        <div className="field-wrapper_error-bug">
                            <Field
                                name="contactNumber"
                                component={AddBusinessInp}
                                type="tel"
                                placeholder="Contact Number"
                                validate={[required]}
                                normalize={(val) => phone(val)}
                                className="col-sm-6"
                            />
                            <Field
                                name="email"
                                component={AddBusinessInp}
                                type="email"
                                placeholder="Email"
                                validate={[required, email]}
                                className="col-sm-6"
                            />
                        </div>

                        <Field
                            name="website"
                            component={AddBusinessInp}
                            type="url"
                            placeholder="Website (http://www.youwebsite.com)"
                            className="col-sm-12"
                        />
                        <div className="col-sm-12">
                            <div className="register-map">
                                <AddBusinessMap reduxFormName="addBusiness" />
                                <span>
                                    Enter the exact address or drag the map marker to position
                                </span>
                            </div>
                        </div>
                        <Field
                            name="latitude"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Latitude"
                            className="col-sm-6"
                            validate={required}
                            normalize={(val) => onlyDigitsAndDot(val)}
                        />
                        <Field
                            name="longitude"
                            component={AddBusinessInp}
                            type="text"
                            placeholder="Longitude"
                            className="col-sm-6"
                            validate={required}
                            normalize={(val) => onlyDigitsAndDot(val)}
                        />
                    </div>
                </div>
                <div className="row button-area">
                    <div className="col-sm-4 col-sm-push-4">
                        <button
                            type="button"
                            onClick={() =>
                                next([
                                    'name',
                                    'area',
                                    'city',
                                    'poBox',
                                    'contactNumber',
                                    'email',
                                    'latitude',
                                    'longitude'
                                ])
                            }
                            className="btn btn-primary btn-block next-step"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Step1;
