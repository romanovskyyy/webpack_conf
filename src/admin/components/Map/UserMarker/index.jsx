import React from 'react';
import './style.scss';

import UserPin from '../../../assets/user-pin.svg';

const MarkerWrapper = () => {
    return (
        <div className="user-marker-div">
            <UserPin width={50} height={50} />
        </div>
    );
};

export default MarkerWrapper;
