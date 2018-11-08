import React, { Component } from 'react';
import './style.scss';

import { dayRender, renderTimePeriod } from '../../../../../../helpers/common';
import { isEqual } from 'lodash';
class Day extends Component {
    shouldComponentUpdate = (nextProps) => !isEqual(nextProps.item, this.props.item);

    render() {
        const { day, item } = this.props;
        return (
            <li>
                <div className={`days ${!item.length ? 'close-time' : ''}`}>
                    {dayRender(day)}
                    &nbsp;
                    <span className="timing pull-right">
                        {item.some((arr) => !!arr.length)
                            ? item.filter((arr) => arr.length > 0).map((period, index) => (
                                  <React.Fragment key={index}>
                                      {renderTimePeriod(period)}
                                      <br />
                                  </React.Fragment>
                              ))
                            : 'Сlosed'}
                    </span>
                </div>
            </li>
        );
    }
}

export default Day;
