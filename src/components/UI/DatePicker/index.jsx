import React, { Component } from 'react';
import './style.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class renderDatePicker extends Component {
    handleChange = (date) => {
        const { input } = this.props;
        if (!date) {
            input.onChange('');
            return;
        }
        input.onChange(moment(date).format('YYYY-MM-DD'));
    };

    render() {
        const { input, placeholder, meta } = this.props;
        const currentDate = moment();
        return (
            <div className={`form-group ${meta.error && meta.touched && 'error'}`}>
                <i className="fa fa-calendar" />
                <DatePicker
                    {...input}
                    placeholderText={placeholder}
                    dateFormat="YYYY-MM-DD"
                    selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
                    onChange={this.handleChange}
                    className="form-control"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={currentDate}
                />
            </div>
        );
    }
}

export default renderDatePicker;
