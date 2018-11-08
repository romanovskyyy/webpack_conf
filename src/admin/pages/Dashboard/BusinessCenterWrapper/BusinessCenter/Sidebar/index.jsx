import React, { Component } from 'react';
import './style.scss';

import { NavLink, withRouter } from 'react-router-dom';

class Sidebar extends Component {
    handleCloseSidebar = (e) => {
        if (e.target.tagName === 'A') {
            this.props.toggleSidebar(false);
        }
    };
    render() {
        const {
            match: {
                params: { businessId }
            },
            isShow,
            toggleSidebar
        } = this.props;
        return (
            <div className={`leftPanel ${isShow ? 'open' : 'closee'}`}>
                <div className="slide-close visible-xs" onClick={() => toggleSidebar(false)}>
                    <i className="demo-icon icon-cancel" />
                </div>
                <ul className="sideNav" onClick={this.handleCloseSidebar}>
                    <li className="details">
                        <NavLink to={`/business-center/${businessId}/`}>
                            <i className="fa fa-info-circle" aria-hidden="true" />
                            Details
                        </NavLink>
                    </li>
                    <li className="location">
                        <NavLink to={`/business-center/${businessId}/location`}>
                            <i className="fa fa-map-marker" aria-hidden="true" />
                            Location
                        </NavLink>
                    </li>
                    <li className="categories">
                        <NavLink to={`/business-center/${businessId}/categories`}>
                            <i className="fa fa-th-large" aria-hidden="true" />
                            Categories
                        </NavLink>
                    </li>
                    <li className="reviews" disabled>
                        <NavLink to="#">
                            <i className="fa fa-star-half-o" aria-hidden="true" />
                            Reviews
                        </NavLink>
                    </li>
                    <li className="galleries">
                        <NavLink to={`/business-center/${businessId}/galleries`}>
                            <i className="fa fa-picture-o" aria-hidden="true" />
                            Gallery
                        </NavLink>
                    </li>
                    <li className="document">
                        <NavLink to={`/business-center/${businessId}/documents`}>
                            <i className="fa fa-file-text-o" aria-hidden="true" />
                            Documents
                        </NavLink>
                    </li>
                    <li className="videos" disabled>
                        <NavLink to="#">
                            <i className="fa fa-file-video-o" aria-hidden="true" />
                            Videos
                        </NavLink>
                    </li>
                    <li className="products">
                        <NavLink to={`/business-center/${businessId}/products`}>
                            <i className="fa fa-cubes" aria-hidden="true" />
                            Products
                        </NavLink>
                    </li>
                    <li className="promotions" disabled>
                        <NavLink to="#">
                            <i className="fa fa-gift" aria-hidden="true" />
                            Deals
                        </NavLink>
                    </li>
                    <li className="bills" disabled>
                        <NavLink to="#">
                            <i className="fa fa-wpforms" aria-hidden="true" />
                            Bills
                        </NavLink>
                    </li>
                    <li className="remove" disabled>
                        <NavLink to="#" data-toggle="modal" data-target="#RemoveListingModal">
                            <i className="fa fa-trash-o" aria-hidden="true" />
                            Remove Listing
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Sidebar);
