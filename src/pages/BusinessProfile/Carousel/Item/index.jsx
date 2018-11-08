import React from 'react';
import './style.scss';

const Item = ({ img, length }) => {
    return (
        <div className="slide">
            <div className="cl">
                <img
                    src={img}
                    alt="Image Listing"
                    className={`img-responsive ${length < 3 ? 'single' : ''}`}
                />
            </div>
        </div>
    );
};

export default Item;
