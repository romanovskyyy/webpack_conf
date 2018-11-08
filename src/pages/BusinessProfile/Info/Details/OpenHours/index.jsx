import React, { Component } from 'react';

import Day from './Day';
import moment from 'moment';

import { dayRender, renderTimePeriod } from '../../../../../helpers/common';

const today = moment()
    .format('ddd')
    .toLowerCase();

class OpenHours extends Component {
    state = {
        isOpen: false
    };

    handleToggleDropdown = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    handleCloseDropdown = () => this.setState({ isOpen: false });

    render() {
        const { isOpen } = this.state;
        const { hours } = this.props;

        return (
            <div className="timings">
                <div className="detailsInfoBox" onBlur={this.handleCloseDropdown}>
                    <div className={`dropdown opening-hours ${isOpen ? 'open' : ''}`}>
                        <button
                            className="btn btn-hours btn-block btn-primary dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            onClick={this.handleToggleDropdown}
                        >
                            <i className="fa fa-clock-o" aria-hidden="true" />
                            <span>{`${dayRender(today)} ${
                                hours[today].some((arr) => !!arr.length)
                                    ? renderTimePeriod(hours[today][0])
                                    : 'Closed'
                            }`}</span>
                            <span className="caret" />
                        </button>
                        <ul className="dropdown-menu">
                            {Object.keys(hours).map((item) => (
                                <Day key={item} item={hours[item]} day={item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default OpenHours;
