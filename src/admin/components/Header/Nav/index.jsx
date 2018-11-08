import React from 'react';
import './style.scss';

import { connect } from 'react-redux';

const Nav = ({ click }) => {
    return (
        <React.Fragment>
            <li className="">
                <a onClick={click} href="/">
                    Home
                </a>
            </li>
            <li className="">
                <a onClick={click} href="/categories">
                    CATEGORY
                </a>
            </li>
            <li className="">
                <a onClick={click} href="/explore/">
                    Explore
                </a>
            </li>
            <li className="">
                <a onClick={click} href="#">
                    Blog
                </a>
            </li>
            <li className="">
                <a onClick={click} href="#">
                    Social Media
                </a>
            </li>
        </React.Fragment>
    );
};

export default connect()(Nav);
