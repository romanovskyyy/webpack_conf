import React, { Component } from 'react';

import { handleRenderStars } from '../../../../../helpers/arrRender';
class Item extends Component {
    render() {
        const { img, name, location, rate } = this.props;
        return (
            <div className="item">
                <div className="ui card special cards link list-card">
                    <div className="blurring dimmable image">
                        <img src={img} alt="Image things" />
                    </div>
                    <div className="content">
                        <div className="ui right floated large heart rating" />
                        <a href="#" className="header">
                            {name}
                        </a>
                        <div className="description">
                            <i className="ui map marker icon" />
                            {location}
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
                            <div className="large icons tags">
                                <i className="circular outline logo-color icon-roller icon" />
                                <i className="circular outline logo-color icon-color-pallette icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Item;
