import React, { Component } from 'react';

import withDropdown from '../../../hoc/Dropdown';

import { changeCategory } from '../../../ducks/explore';

class Category extends Component {
    render() {
        const { category } = this.props;
        return (
            <div className="col-sm-4 col-xs-12">
                <div className="searchPart">
                    <div className="searchPartInner">
                        <div className="searchPartTitle">Category</div>
                        <div className="searchSelectboxes">
                            <select name="guiest_id32" className="search dropdown category">
                                <option value="">Category</option>
                                {category.map((item) => (
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
    className: '.search.dropdown.category',
    change: (value) => (dispatch) => dispatch(changeCategory(value))
})(Category);
