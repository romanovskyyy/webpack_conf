import React, { Component } from 'react';
import './style.scss';

import { changeBy } from '../../../../ducks/explore';
import { connect } from 'react-redux';
import withDropdown from '../../../../hoc/Dropdown';

class BannerDropdown extends Component {
    render() {
        return (
            <div className="form-group">
                <div className="ui selection dropdown input-group main">
                    <input
                        type="hidden"
                        name="user"
                        className="form-control"
                        placeholder="What are you looking for?"
                    />
                    <i className="dropdown icon" />
                    <div className="default text" style={{ padding: '6px 6px 6px 7px' }}>
                        What type you looking for?
                    </div>

                    <div className="menu" style={{ position: 'absolute' }}>
                        <div className="item" data-value="category">
                            <i className="icon-fontello-drop icon-opened-box" />
                            Category <span className="menu-item-description">Tag</span>
                        </div>
                        <div className="item" data-value="product">
                            <i className="icon-fontello-drop icon-barcode" />
                            Product
                            <span className="menu-item-description">Tag</span>
                        </div>
                        <div className="item" data-value="brand">
                            <i className="icon-fontello-drop icon-price-tag-1" />
                            Brand
                            <span className="menu-item-description">Tag</span>
                        </div>
                        <div className="item" data-value="businessName">
                            <i className="icon-fontello-drop icon-shop-1" />
                            Business Name
                            <span className="menu-item-description">Tag</span>
                        </div>
                        <div className="item" data-value="service">
                            <i className="icon-fontello-drop icon-paint-roll" />
                            Service
                            <span className="menu-item-description">Tag</span>
                        </div>
                        <div className="item" data-value="placeOfInterest">
                            <i className="icon-fontello-drop icon-directions" />
                            Place of Interest
                            <span className="menu-item-description">Tag</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(
    withDropdown({
        className: '.ui.dropdown.main',
        change: (value) => (dispatch) => dispatch(changeBy(value))
    })(BannerDropdown)
);
