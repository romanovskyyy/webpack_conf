import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
    header,
    price,
    isActive = false,
    benefits,
    more,
    btnText,
    pluses,
    advancedClass
}) => {
    return (
        <div className="col-sm-4 col-xs-12">
            <div className={`priceTableWrapper ${advancedClass}`}>
                <div className="priceTableTitle">
                    <h2>
                        {header.first} <small>{header.second}</small>
                    </h2>
                </div>
                <div className="priceAmount">
                    <h2>
                        {price}
                        <small>AED/Year</small>
                    </h2>
                </div>
                <div className="priceInfo">
                    <ul className="priceShorting">
                        <li className="active">
                            <i className="fa fa-check-square" />
                            <p>Highlighted listing</p>
                        </li>
                        <li className={isActive ? 'active' : ''}>
                            <i className="fa fa-check-square" />
                            <p>Top listing placement on:</p>
                            <ul>
                                <li className={pluses >= 1 ? 'active' : ''}>
                                    <i className="fa fa-check-square" />
                                    Search results
                                </li>
                                <li className={pluses >= 3 ? 'active' : ''}>
                                    <i className="fa fa-check-square" />
                                    Selected categories
                                </li>
                                <li className={pluses >= 3 ? 'active' : ''}>
                                    <i className="fa fa-check-square" />
                                    Added keywords
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {more()}
                    <ul className="list-unstyled">
                        <li>{benefits[0]} Products</li>
                        <li>{benefits[1]} Photos</li>
                        <li>{benefits[2]} Keywords</li>
                        <li>{benefits[3]} Categories</li>
                    </ul>
                    <div className="priceBtn">
                        <Link to="/" className="btn btn-primary">
                            {btnText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
