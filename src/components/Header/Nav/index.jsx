import React from 'react';
import './style.scss';

import queryString from 'query-string';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ search, click }) => {
    const parsedQuery = queryString.stringify(search, { arrayFormat: 'none' });

    return (
        <React.Fragment>
            <li className="">
                <NavLink onClick={click} to="/">
                    Home
                </NavLink>
            </li>
            <li className="">
                <NavLink onClick={click} to="/categories">
                    CATEGORY
                </NavLink>
            </li>
            <li className="">
                <NavLink onClick={click} to={`/explore/${parsedQuery}`}>
                    Explore
                </NavLink>
            </li>
            <li className="">
                <NavLink onClick={click} to="#">
                    Blog
                </NavLink>
            </li>
            <li className="">
                <NavLink onClick={click} to="#">
                    Social Media
                </NavLink>
            </li>
        </React.Fragment>
    );
};

const mapStateToProps = ({ explore }) => ({ search: explore.search });

export default connect(mapStateToProps)(Nav);
