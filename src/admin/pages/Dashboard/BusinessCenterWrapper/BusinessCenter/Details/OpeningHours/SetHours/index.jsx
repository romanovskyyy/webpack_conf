import React, { Component } from 'react';

import Day from './Day';

import { Field } from 'redux-form';
import { required } from '../../../../../../../helpers/validation';

export default class SetHours extends Component {
    render() {
        const { hide } = this.props;

        return (
            <div className="modal-dialog login">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={hide}>
                            &times;
                        </button>
                        <h4 className="modal-title">Set Working Hours</h4>
                    </div>
                    <div className="modal-body">
                        <div className="box">
                            <div className="content openinghour">
                                <div className="row_custom">
                                    <Field component={Day} name="openingHours.sun" day="Sunday" />
                                    <Field component={Day} name="openingHours.mon" day="Monday" />
                                    <Field component={Day} name="openingHours.tue" day="Tuesday" />
                                    <Field
                                        component={Day}
                                        name="openingHours.wed"
                                        day="Wednesday"
                                    />
                                    <Field component={Day} name="openingHours.thu" day="Thursday" />
                                    <Field component={Day} name="openingHours.fri" day="Friday" />
                                    <Field component={Day} name="openingHours.sat" day="Saturday" />
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="hourSaveButtonArea">
                                            <button
                                                type="submit"
                                                className="btn btn-default btn-hour"
                                            >
                                                <i className="fa fa-calendar" aria-hidden="true" />{' '}
                                                Save Hours
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
