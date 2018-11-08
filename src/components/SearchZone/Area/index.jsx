import React, { Component } from 'react';

import { changeArea } from '../../../ducks/explore';
import withDropdown from '../../../hoc/Dropdown';

class Area extends Component {
    render() {
        const { areaArr } = this.props;
        return (
            <div className="col-sm-4 col-xs-12">
                <div className="searchPart">
                    <div className="searchPartInner">
                        <div className="searchPartTitle">Area</div>
                        <div className="searchSelectboxes">
                            <select
                                name="guiest_id32"
                                id="guiest_id32"
                                className="search dropdown area"
                            >
                                <option value="">Area</option>
                                {areaArr.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withDropdown({
    className: '.search.dropdown.area',
    change: (value) => (dispatch) => dispatch(changeArea(value))
})(Area);
