import React from 'react';
import './style.scss';

import ProfileLinks from '../ProfileLinks';

const NavbarMobile = ({ userData, dispatch, click }) => {
    return (
        <li className="visible-xs">
            <div className="profile-section">
                <div className="user-details">
                    {userData && userData.avatar ? (
                        <img
                            src={userData.avatar.cropUrl || userData.avatar.storageUrl}
                            alt="user-name"
                        />
                    ) : (
                        <span>
                            <p className="fa fa-user-circle-o" />
                        </span>
                    )}
                    <p>
                        <span className="auth_link_wrapper">
                            {userData &&
                                (userData.firstName && userData.lastName
                                    ? `${userData.firstName} ${userData.lastName}`
                                    : userData.name)}
                        </span>
                    </p>
                </div>
                <div className="profile-links">
                    <ul onClick={click}>
                        <ProfileLinks dispatch={dispatch} />
                    </ul>
                </div>
            </div>
        </li>
    );
};

export default NavbarMobile;
