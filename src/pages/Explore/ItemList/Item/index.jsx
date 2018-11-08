import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';
import { handleRenderStars } from '../../../../helpers/arrRender';
import { setSelectedBusinessLocation, updRouteType } from '../../../../ducks/mapRouting';

class Item extends Component {
    hoverOn = (e) => {
        e.persist();
        if (e.target.innerText === 'Get Directions') {
            $(e.target).dimmer('show');
        } else {
            $(e.target.previousSibling).dimmer('show');
        }
    };

    hoverOff = () => $('.ui.dimmer').dimmer('hide');

    handleBusinessClick = () => {
        const { dispatch, geoLoc } = this.props;
        dispatch(updRouteType('car'));
        dispatch(setSelectedBusinessLocation(geoLoc));
    };

    render() {
        const { img, loc, rate, category, listingTitle, linkId } = this.props;
        return (
            <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="ui card special cards link list-card explore-list-box">
                    <div
                        className="blurring dimmable image"
                        onMouseEnter={this.hoverOn}
                        onMouseLeave={this.hoverOff}
                    >
                        <div className={`ui dimmer`}>
                            <div className="content">
                                <div className="center">
                                    <div
                                        className="ui inverted button"
                                        onClick={this.handleBusinessClick}
                                    >
                                        Get Directions
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={img} alt="Image things" className="explore-image" />
                    </div>
                    <div className="content">
                        <div className="ui right floated large heart rating" />
                        <Link to={`/${linkId}`} className="header">
                            {listingTitle}
                        </Link>
                        <div className="description">
                            <i className="ui map marker icon" />
                            {loc}
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="left floated">
                            Rating
                            <ul className="list-inline rating">
                                <li className="ui star rating">{handleRenderStars(rate)}</li>
                            </ul>
                        </div>
                        <div className="right floated">
                            {category.length > 0 &&
                                category.map((item) => (
                                    <div key={item.id} className="large icons tags">
                                        <i
                                            title={item.name}
                                            className="circular outline logo-color icon-roller icon"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Item;
