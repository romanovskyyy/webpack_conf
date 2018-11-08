import React, { Component } from 'react';
import './style.scss';

import ProfileLinks from '../ProfileLinks';
import { NavLink } from 'react-router-dom';

class NavbarAuth extends Component {
    componentDidMount = () => {
        $('.header-nav li:last-child a').click(function() {
            $('.header-nav li:last-child').toggleClass('show-list');
            $('.profile-dropdown').fadeToggle('slow');
        });

        $('button.navbar-toggle').click(function() {
            $('.navbar-collapse').addClass('slide');
        });

        $('.slide-close i').click(function() {
            $('.navbar-collapse').removeClass('slide');
        });
    };

    render() {
        const { userData, dispatch, click } = this.props;
        return (
            <React.Fragment>
                <li className="">
                    <NavLink onClick={click} to="/add-business">
                        Add Business
                    </NavLink>
                </li>
                <li className="hidden-xs">
                    <a href="javascript:void('0')" className="auth_link">
                        <div className="auth_link_wrapper">
                            {userData &&
                                (userData.firstName && userData.lastName
                                    ? `${userData.firstName} ${userData.lastName}`
                                    : userData.name)}
                        </div>
                        {userData && !userData.avatar ? (
                            <span>
                                <p className="fa fa-user-circle-o" />
                            </span>
                        ) : (
                            <span>
                                {/* <i className="notification">5</i> */}
                                <img
                                    src={
                                        userData &&
                                        (userData.avatar.cropUrl || userData.avatar.storageUrl)
                                    }
                                    alt="user-name"
                                />
                            </span>
                        )}
                    </a>
                    <ul className="profile-dropdown is-hidden" ref={this.menuRef} onClick={click}>
                        <ProfileLinks dispatch={dispatch} />
                    </ul>
                </li>
            </React.Fragment>
        );
    }
}

export default NavbarAuth;
