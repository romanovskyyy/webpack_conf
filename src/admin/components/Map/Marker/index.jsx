import React from 'react';
import './style.scss';

import MarkerSvg from '../../../assets/img/marker3.svg';

const MarkerWrapper = ({ item }) => {
    return (
        <div className="marker-div">
            <img
                src={(item.files[0] && item.files[0].cropUrl) || '/img/business_crop.jpg'}
                alt="marker"
            />
            <MarkerSvg width={50} height={50} />
        </div>
    );
};

export default MarkerWrapper;
