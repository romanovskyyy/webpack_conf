import React from 'react';

import { NavLink } from 'react-router-dom';

const ProfileLinks = ({ dispatch }) => {
    return (
        <React.Fragment>
            <li>
                <NavLink to="/business-center">
                    <i className="fa fa-briefcase" aria-hidden="true" />
                    Business Centre
                </NavLink>
            </li>
            <li>
                <NavLink to="#">
                    <i className="fa fa-user-circle-o" aria-hidden="true" />
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/edit-profile">
                    <i className="fa fa-cogs" aria-hidden="true" />
                    Account Settings
                </NavLink>
            </li>
            <li>
                <NavLink to="#">
                    <i className="fa fa-bell" aria-hidden="true" />
                    Notification
                </NavLink>
            </li>
            <li>
                <a href="javascript: showLoginForm();">
                    <i className="fa fa-sign-out" aria-hidden="true" />
                    Log out
                </a>
            </li>
        </React.Fragment>
    );
};

export default ProfileLinks;
