import React from 'react';
import './style.scss';

const InfoWindow = ({
    item: {
        buildingNumber = '',
        streetName = '',
        streetNumber = '',
        linkId,
        files,
        listingTitle,
        area
    }
}) => {
    return (
        <div className="explore-infobox-inner">
            <img src={(files && files[0] && files[0].storageUrl) || '/img/business.jpg'} alt="" />
            <div className="explore-infobox-inner-text">
                <a target="_blank" href={`/${linkId}`}>
                    {listingTitle}
                </a>
                <div className="location">
                    <span>{`${buildingNumber ? buildingNumber + ',' : ''} ${
                        streetNumber ? streetNumber + ',' : ''
                    } ${streetName ? streetName + ',' : ''} ${area.name}`}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoWindow;
