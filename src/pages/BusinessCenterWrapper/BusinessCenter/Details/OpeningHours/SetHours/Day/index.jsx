import React, { Component } from 'react';
import './style.scss';

import { Field } from 'redux-form';
import Time from './Time';

export default class Day extends Component {
    state = {
        isMultiple: false,
        isClosed: false
    };

    componentWillMount = () => {
        const { value } = this.props.input;
        let timeCounter = 0;
        Object.keys(value).forEach((item) => {
            if (value[item]) {
                timeCounter++;
            }
        });

        if (timeCounter > 2) {
            this.setState({ isMultiple: true });
        } else if (timeCounter === 0) {
            this.setState({ isClosed: true });
        }
    };

    handleToggleMultiple = () => this.setState(({ isMultiple }) => ({ isMultiple: !isMultiple }));

    handleToggleClosed = () => {
        this.setState(
            ({ isClosed }) => ({ isClosed: !isClosed }),
            () => {
                if (this.state.isClosed) {
                    this.props.input.onChange({});
                }
            }
        );
    };

    render() {
        const { day, input } = this.props;
        const { isClosed, isMultiple } = this.state;

        return (
            <div className="form-group col-md-6 col-sm-6 col-xs-6">
                <label htmlor="sundayTime">{day}</label>
                <div className="ui container">
                    <div className="ui form">
                        <div className="two fields">
                            <Field
                                component={Time}
                                isClosed={isClosed}
                                name={`${input.name}.startTime`}
                            />
                            <Field
                                component={Time}
                                isClosed={isClosed}
                                name={`${input.name}.endTime`}
                            />
                        </div>
                        {isMultiple && (
                            <div className="two fields">
                                <Field
                                    component={Time}
                                    isClosed={isClosed}
                                    name={`${input.name}.secondStartTime`}
                                />
                                <Field
                                    component={Time}
                                    isClosed={isClosed}
                                    name={`${input.name}.secondEndTime`}
                                />
                            </div>
                        )}
                        <div className="checkbox-section">
                            <ul>
                                <li>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleToggleMultiple}
                                        defaultChecked={isMultiple}
                                    />
                                    &nbsp; Multiple
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        onChange={this.handleToggleClosed}
                                        defaultChecked={isClosed}
                                    />
                                    &nbsp; Closed
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
